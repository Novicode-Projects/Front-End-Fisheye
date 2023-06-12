const GlobalSection = document.querySelector(".photograph-gallery");
const GlobalCustomSelect = document.querySelector(".custom-select");
const GlobalSelectSelected = document.querySelector(".select-selected");
const GlobalSelectBorders = document.querySelectorAll(".select-border");
const GlobalSelectItems = document.querySelectorAll(".select-items");
const GlobalStats = document.querySelector(".stats");
const GlobalSelectArray = ["Popularité", "Date", "Titre"];
let GlobalPhotographer = [];
let GlobalMedia = [];
let GlobalI;

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
    updateCurrentSelect("Popularité", "Date", "Titre");
    GlobalMedia.sort(sortByLike);
  }

  // Sort By Date
  else if (selectValue == "date") {
    updateCurrentSelect("Date", "Popularité", "Titre");
    GlobalMedia.sort(sortByDate);
  }

  // Sort By Title
  else if (selectValue == "title") {
    updateCurrentSelect("Titre", "Date", "Popularité");
    GlobalMedia.sort(sortByTitle);
  }
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

  updateCurrentSelect("Popularité", "Date", "Titre");
  mediaSort("popularity");
  updateMediaCardsDOM();

  const h3 = modal.querySelector("h3");
  h3.textContent = GlobalPhotographer.name;

  const arrayLikes = GlobalMedia.map(({ likes }) => likes);

  GlobalStats.querySelector(":scope > .like > p").textContent =
    arrayLikes.reduce((a, b) => a + b, 0);
  GlobalStats.querySelector(":scope > .price > p").textContent =
    GlobalPhotographer.price;
};

init();

const updateCurrentSelect = (value) => {
  let selectArray = [];

  if (value == "popularity") {
    selectArray = ["Popularité", "Date", "Titre"];
  } else if (value == "date") {
    selectArray = ["Date", "Popularité", "Titre"];
  } else if (value == "title") {
    selectArray = ["Titre", "Date", "Popularité"];
  }

  const [hiddenSelect1, hiddenSelect2] = GlobalSelectItems;

  selectArray.map((value, key) => {
    if (key == 0) {
      GlobalSelectSelected.querySelector(":scope > p").textContent = value;
    } else if (key == 1) {
      hiddenSelect1.querySelector(":scope > p").textContent = value;
    } else if (key == 2) {
      hiddenSelect2.querySelector(":scope > p").textContent = value;
    }
  });
};

const GlobalCustomSelectChildren =
  GlobalCustomSelect.querySelectorAll(":scope > div");

GlobalCustomSelectChildren.forEach((div) => {
  if (div.dataset.select == "selected") {
    div.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        if (div.className == "select-selected select") {
          div.classList.add("select-active");
          div.classList.remove("select");
        } else if (div.className == "select-selected select-active") {
          div.classList.add("select");
          div.classList.remove("select-active");
        }

        GlobalSelectItems.forEach((item) => {
          item.classList.toggle("select-hide");
        });
        GlobalSelectBorders.forEach((item) => {
          item.classList.toggle("select-hide");
        });
      }
    });
  }

  div.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      updateCurrentSelect(div.dataset.value);
      mediaSort(div.dataset.value);
      updateMediaCardsDOM();
    }
  });
});
