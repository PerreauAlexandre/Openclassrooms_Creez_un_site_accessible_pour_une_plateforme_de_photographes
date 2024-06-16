class videoTemplate {
    constructor(mediaData) {
        this._id = mediaData.id;
        this._title = mediaData.title;
        this._video = mediaData.video;
        this._likes = mediaData.likes;
    }

    get likes () {
        return this._likes;
    }

    get id () {
        return this._id;
    }

    getMediaCardDOM() {
        const article = document.createElement("article");

        const a = document.createElement("a");
        a.href = "#";
        a.classList.add("lightbox-button");
        a.dataset.mediaId = this._id;
        const video = document.createElement("video");
        video.src = `assets/medias/${this._video}`;

        a.appendChild(video);
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

    fillLightbox() {
        const lightboxMedia = document.querySelector(".lightbox-media");
        lightboxMedia.innerHTML = "";

        const video = document.createElement("video");
        video.src = `assets/medias/${this._video}`;
        video.controls = true;
        const mediaTitle = document.createElement("div");
        mediaTitle.textContent = this._title;
        mediaTitle.classList.add("media-title");

        lightboxMedia.appendChild(video);
        lightboxMedia.appendChild(mediaTitle);
    }
}