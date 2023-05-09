// Récupère les données du JSON
const getPhotographers = async () => {
  const photographers = await fetch("./data/photographers.json")
    .then((resp) => resp.json())
    .catch((err) => console.error(err));

  return photographers;
};

// Affiche les Photos dans le DOM
const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

// Fonction principale
const init = async () => {
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

// Le code s'executera après le chargement de la page web
//window.addEventListener("DOMContentLoaded", init());
init();
