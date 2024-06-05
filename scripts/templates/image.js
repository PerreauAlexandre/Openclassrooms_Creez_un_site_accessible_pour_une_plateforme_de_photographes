class imageTemplate {
    constructor(mediaData) {
        this._title = mediaData.title;
        this._image = mediaData.image;
        this._likes = mediaData.likes;
    }

    getMediaCardDOM() {
        const article = document.createElement("article");

        const a = document.createElement("a");
        a.href = "";
        const img = document.createElement("img");
        img.src = `assets/medias/${this._image}`;
        img.alt = this._title;

        a.appendChild(img);
        article.appendChild(a);

        const informationDiv = document.createElement("div");
        informationDiv.classList.add("media-informations");
        const h2 = document.createElement("h2");
        h2.textContent = this._title;
        const likeDiv = document.createElement("div");
        likeDiv.textContent = this._likes;
        const likeLogo = document.createElement("i");
        likeLogo.classList.add("fa-solid");
        likeLogo.classList.add("fa-heart");

        likeDiv.appendChild(likeLogo);
        informationDiv.appendChild(h2);
        informationDiv.appendChild(likeDiv);

        article.appendChild(informationDiv);

        return (article);
    }
}