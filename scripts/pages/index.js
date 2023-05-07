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

  const body = document.querySelector("body");
  const photographersSection = document.querySelectorAll(
    ".photographer_section article",
  );
  let i = 0;

  body.addEventListener("keydown", (e) => {
    // Navigation
    if (e.key == "Tab") {
      i < photographersSection.length - 1 ? i++ : (i = 0);
    }
    // Selection du profil
    else if (e.key == "Enter") {
      console.log(photographersSection[i]);
    }
  });
};

// Le code s'executera après le chargement de la page web
window.addEventListener("DOMContentLoaded", init());
