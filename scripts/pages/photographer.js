const GlobalSection = document.querySelector(".photograph-gallery");
let GlobalPhotographer = [];
let GlobalMedia = [];

// Récupère le Photographe et ses photos
const getDataPhotographer = async () => {
  const dataPhotographers = await fetch("./data/photographers.json")
    .then((resp) => resp.json())
    .catch((err) => console.error(err));

  const { photographers, media } = dataPhotographers;

  const urlParam = window.location.search;
  const idPhotographer = urlParam.substring(urlParam.lastIndexOf("=") + 1);

  const photographer = photographers.find(
    (photographer) => photographer.id == idPhotographer,
  );

  let mediaPhotographer = [];
  media.forEach((med) => {
    if (med.photographerId == idPhotographer) {
      mediaPhotographer.push(med);
    }
  });

  return { photographer, mediaPhotographer };
};

// Met à jour le Header
const updatePhotographHeader = () => {
  const { name, city, country, tagline, portrait } = GlobalPhotographer;
  // H2
  const h2 = document.querySelector(".photograph-header h2");
  h2.textContent = name;
  // H3
  const h3 = document.querySelector(".photograph-header h3");
  h3.textContent = `${city}, ${country}`;

  // P
  const p = document.querySelector(".photograph-header p");
  p.textContent = tagline;

  // Img
  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
  const img = document.querySelector(".photograph-header img");
  img.setAttribute("src", picture);
};

// Affiche les Photos dans la galerie
const createMediaCardsDOM = async () => {
  GlobalMedia.forEach((media, key) => {
    const mediaCardDOM = createMediaCardDOM(key, media);
    GlobalSection.appendChild(mediaCardDOM);
  });
};

const mediaSort = (selectValue) => {
  // Sort By Popularity
  if (selectValue == "popularity") {
    GlobalMedia.sort(sortByLike);
    console.log("popularity");
  }

  // Sort By Date
  else if (selectValue == "date") {
    GlobalMedia.reverse(sortByDate);
    console.log("date");
  }

  // Sort By Title
  else if (selectValue == "title") {
    GlobalMedia.sort(sortByTitle);
    console.log("title");
  }

  console.log(GlobalMedia);
};

const sortByLike = (media1, media2) => {
  if (media1.likes < media2.likes) {
    return -1;
  } else if (media1.likes > media2.likes) {
    return 1;
  } else {
    return 0;
  }
};

const sortByDate = (media1, media2) => {
  if (new Date(media1.date) < new Date(media2.date)) {
    return -1;
  } else if (new Date(media1.date) > new Date(media2.date)) {
    return 1;
  } else {
    return 0;
  }
};

const sortByTitle = (media1, media2) => {
  if (media1.title < media2.title) {
    return -1;
  } else if (media1.title > media2.title) {
    return 1;
  } else {
    return 0;
  }
};

const init = async () => {
  const { photographer, mediaPhotographer } = await getDataPhotographer();
  GlobalMedia = mediaPhotographer;
  GlobalPhotographer = photographer;

  updatePhotographHeader();
  createMediaCardsDOM();

  mediaSort("popularity");
  updateMediaCardsDOM();

  const select = document.querySelector(".photograph-form select");

  select.addEventListener("change", function () {
    mediaSort(this.value);
    updateMediaCardsDOM();
  });

  const h3 = modal.querySelector("h3");
  h3.textContent = GlobalPhotographer.name;
  console.log(GlobalPhotographer);
};

//window.addEventListener("DOMContentLoaded", init());
init();
