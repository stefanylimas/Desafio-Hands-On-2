// const params = parseQueryString(window.location.search);

// if (!params.id) {
//   window.location.replace("admin.html");
// }

// getEventoPorId(params.id);

// const formulario = document.querySelector("main div form");

// formulario.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const body = {};

//   for (i = 0; i < formulario.elements.length - 1; i++) {
//     const item = formulario.elements[i];

//     body[item.name] =
//       item.name === "attractions" ? item.value.split(",") : item.value;
//   }

//   fetch(`${BASE_URL}/events/${params.id}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   })
//     .then(() => {
//       alert("Evento atualizado com sucesso");
//       window.location.replace("admin.html");
//     })
//     .catch((error) => console.log(error.message));
// });

const arrowGetEventById = async () => {
  try {
    const queryParameter = new URLSearchParams(window.location.search);

    const response = await fetch(
      "https://xp41-soundgarden-api.herokuapp.com/events/" +
        queryParameter.get("id")
    );

    const data = await response.json();

    return data;
  } catch {
    (error) => console.error(error);
  }
};

function placeInputByEvent(event) {
  const nameSelector = document.querySelector("#name-input");
  nameSelector.value = event.name;

  const bannerSelector = document.querySelector("#banner-input");
  bannerSelector.value = event.poster;

  const attractionsSelector = document.querySelector("#attractions-input");
  attractionsSelector.value = event.attractions.join(", ");

  const descriptionSelector = document.querySelector("#description-input");
  descriptionSelector.value = event.description;

  const dateSelector = document.querySelector("#date-input");
  dateSelector.value = event.scheduled.substring(0, 16);

  const capacityInput = document.querySelector("#capacity-input");
  capacityInput.value = event.number_tickets;
}

function createBodyFromInput(event){
  const nameSelector = document.querySelector("#name-input");
  const bannerSelector = document.querySelector("#banner-input");
  const attractionsSelector = document.querySelector("#attractions-input");
  const descriptionSelector = document.querySelector("#description-input");
  const dateSelector = document.querySelector("#date-input");
  const capacityInput = document.querySelector("#capacity-input");

  // const body = {}

  // if(nameSelector.value === event.name){
  //   body.name = nameSelector.value;
  // }

  return {
    "name": nameSelector.value,
    "attractions": attractionsSelector.value.split(', '),
    "poster": bannerSelector.value,
    "description": descriptionSelector.value,
    "scheduled": dateSelector.value,
    "number_tickets": capacityInput.value
  };

}

async function main() {
  try {
    const queryParameter = new URLSearchParams(window.location.search);
    const event = await arrowGetEventById();
    

    placeInputByEvent(event);
   
    const formSelector = document.querySelector("#form");

    formSelector.addEventListener('submit', (event) => {
      event.preventDefault();

      const body =  createBodyFromInput(event);

      fetch(("https://xp41-soundgarden-api.herokuapp.com/events/" +
      queryParameter.get("id")), {"method": "PUT", "headers": {"content-type": "application/json"}, 
      "body": JSON.stringify(body)
    }).then(response => {
      console.log(response);
      alert("Seu evento foi atualizado!")
      }).catch(error => {console.error(error)})

    })

  } catch  {
    (error) => console.error(error);
  }
}

main();
