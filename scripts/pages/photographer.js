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

const init = async () => {
  const { photographer, mediaPhotographer } = await getDataPhotographer();
  console.log(photographer);
};

window.addEventListener("DOMContentLoaded", init());
