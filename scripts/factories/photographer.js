function photographerFactory(data) {
  console.log(data);
  const { city, country, id, name, portrait, price, tagline } = data;

  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    // Article
    const article = document.createElement("article");

    // Img + H2 + A
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const a = document.createElement("a");
    a.setAttribute("href", `./photographer.html?id=${id}`);

    a.append(img, h2);

    // H3
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;

    // P
    const p = document.createElement("p");
    p.textContent = tagline;

    // Span
    const span = document.createElement("span");
    span.textContent = price;

    // Ajoute au Dom
    article.append(a, h3, p, span);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
