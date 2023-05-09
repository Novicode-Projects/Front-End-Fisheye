const createMediaCardDOM = (key) => {
  const article = document.createElement("article");
  article.tabIndex = key;

  const img = document.createElement("img");
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const div2 = document.createElement("div");
  const span = document.createElement("span");

  const button = document.createElement("button");
  const i = document.createElement("i");

  i.classList.add("fa-solid", "fa-heart");

  button.appendChild(i);
  button.dataset.index = "";

  button.addEventListener("click", ({ currentTarget }) => {
    const targetIndex = currentTarget.dataset.index;

    GlobalMedia[targetIndex].likes++;
    updateMediaCardsDOM();
  });

  // Ajoute au Dom
  div2.append(span, button);
  div.append(h3, div2);
  article.append(img, div);

  return article;
};

const updateMediaCardsDOM = () => {
  const mediaCardsDOM = document.querySelectorAll(
    ".photograph-gallery article",
  );

  mediaCardsDOM.forEach((mediaCardDOM) => {
    GlobalMedia.forEach((media, key) => {
      if (mediaCardDOM.tabIndex == key) {
        const { title, likes } = media;
        const image = isImage(media);

        const img = mediaCardDOM.querySelector("img");
        img.setAttribute("alt", title);

        if (image) {
          const { image } = media;
          const file = `assets/photographers/${GlobalPhotographer.name}/${image}`;
          img.setAttribute("src", `${file}`);
        } else {
          img.setAttribute("src", `https://picsum.photos/id/237/200/300`);
        }

        const h3 = mediaCardDOM.querySelector("h3");
        h3.textContent = title;

        const span = mediaCardDOM.querySelector("span");
        span.textContent = likes;

        const button = mediaCardDOM.querySelector("button");
        button.dataset.index = mediaCardDOM.tabIndex;
      }
    });
  });
};

const isImage = (media) => {
  return media.hasOwnProperty("image") ? true : false;
};
