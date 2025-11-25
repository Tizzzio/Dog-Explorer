const loadDogBtn = document.getElementById("loadDogBtn");
const dogsContainer = document.getElementById("dogsContainer");
const loader = document.getElementById("loader");
const breedSelect = document.getElementById("breedSelect");

let allBreeds = [];
let breedList = [];

// Event listeners
loadDogBtn.addEventListener("click", loadDog);
breedSelect.addEventListener("change", loadDog);

function showLoader(show) {
  loader.classList.toggle("hidden", !show);
}

// Carica lista razze al caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((data) => {
      breedList = Object.keys(data.message);
      breedList.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
      });
    });
});

// Carica un cane (casuale o per razza)
function loadDog() {
  showLoader(true);

  let url = "https://dog.ceo/api/breeds/image/random";
  const selectedBreed = breedSelect.value;

  if (selectedBreed) {
    url = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const card = document.createElement("div");
      card.className = "dog-card";
      card.innerHTML = `<img src="${data.message}" alt="Cane">`;
      dogsContainer.prepend(card);
    })
    .catch((err) => console.error("Errore:", err))
    .finally(() => showLoader(false));
}
