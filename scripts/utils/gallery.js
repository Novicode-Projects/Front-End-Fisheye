const main = document.querySelector("main");
const galleryModal = document.querySelector("#gallery-modal");
const galleryModalCloseButton = document.querySelector(".gallery-modalClose");

const galleryModalImg = document.querySelector("#gallery-modal img");
const galleryModalp = document.querySelector("#gallery-modal p");

const galleryModalPreviousButton = document.querySelector(
  ".gallery-modalPreviousButton",
);
const galleryModalNextButton = document.querySelector(
  ".gallery-modalNextButton",
);

const displayGalleryModal = () => {
  main.style.display = "none";
  galleryModal.style.display = "flex";
};

// Close Gallery
galleryModalCloseButton.addEventListener("click", () => {
  main.style.display = "block";
  galleryModal.style.display = "none";
});

// Previous Card
galleryModalPreviousButton.addEventListener("click", () => {
  GlobalI--;

  if (GlobalI - 1 < 0) {
    GlobalI = GlobalMedia.length;
  }

  updateGalleryCard();
});

// Next Card
galleryModalNextButton.addEventListener("click", () => {
  GlobalI++;

  if (GlobalI + 1 > GlobalMedia.length) {
    GlobalI = 0;
  }

  updateGalleryCard();
});
