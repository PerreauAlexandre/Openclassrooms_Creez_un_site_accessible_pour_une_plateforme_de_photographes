class photographerTemplate {
    constructor(data) {
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
        this._id = data.id;
    }

    getUserCardDOM() {
        const article = document.createElement("article");

        const a = document.createElement("a");
        a.href = `./photographer.html?id=${this._id}`;
        const img = document.createElement("img");
        img.src = `assets/photographers/${this._portrait}`;
        img.alt = this._name;
        const h2 = document.createElement("h2");
        h2.textContent = this._name;

        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);

        const informationDiv = document.createElement("div");
        informationDiv.classList.add("photographer_informations");
        const locationDiv = document.createElement("div");
        locationDiv.classList.add("photographer_location");
        locationDiv.textContent = `${this._city}, ${this._country}`;
        const taglineDiv = document.createElement("div");
        taglineDiv.classList.add("photographer_tagline");
        taglineDiv.textContent = this._tagline;
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("photographer_price");
        priceDiv.textContent = `${this._price}€/jour`;

        informationDiv.appendChild(locationDiv);
        informationDiv.appendChild(taglineDiv);
        informationDiv.appendChild(priceDiv);

        article.appendChild(informationDiv);

        return (article);
    }

    fillUserInformations() {
        const photographerName = document.querySelector(".name");
        photographerName.textContent = this._name;
        const photographerLocation = document.querySelector(".location");
        photographerLocation.textContent = `${this._city}, ${this._country}`;
        const photographerTagline = document.querySelector(".tagline");
        photographerTagline.textContent = this._tagline;
        const photographePortrait = document.querySelector(".portrait");
        photographePortrait.setAttribute("src", `assets/photographers/${this._portrait}`);
    }
}