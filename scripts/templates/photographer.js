function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");

        // const a = document.createElement("a");
        // a.href = "./photographer.html";
        // const img = document.createElement("img");
        // img.setAttribute("src", picture);
        // const h2 = document.createElement("h2");
        // h2.textContent = name;
        // a.appendChild(img);
        // a.appendChild(h2);
        
        // const p = document.createElement("p");
        // const locationDiv = document.createElement("div");
        // locationDiv.textContent = `${city}, ${country}`;
        // const taglineDiv = document.createElement("div");
        // taglineDiv.textContent = tagline;
        // const priceDiv = document.createElement("div");
        // priceDiv.textContent = `${price}€/jour`;
        // p.appendChild(locationDiv);
        // p.appendChild(taglineDiv);
        // p.appendChild(priceDiv);

        // article.appendChild(a);
        // article.appendChild(p);

        const userCard = `
            <a href="./photographer.html">
                <img src=${picture}>
                <h2>${name}</h2>
            </a>
            <div class="photographer_location">${city}, ${country}</div>
            <div class="photographer_tagline">${tagline}</div>
            <div class="photographer_price">${price}€/jour</div>
        `;

        article.innerHTML = userCard;

        return (article);
    }
    return { name, picture, getUserCardDOM };
}