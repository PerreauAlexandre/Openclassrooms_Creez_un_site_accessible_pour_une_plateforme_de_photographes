class VideoTemplate {
    constructor(mediaData) {
        this._id = mediaData.id;
        this._title = mediaData.title;
        this._video = mediaData.video;
        this._likes = mediaData.likes;
        this._date = mediaData.date;
        this._isLiked = false;
    }

    get likes() {
        return this._likes;
    }

    get id() {
        return this._id;
    }

    get date() {
        return this._date;
    }

    get title() {
        return this._title;
    }

    getMediaCardDOM() {
        const article = document.createElement("article");

        const a = document.createElement("a");
        a.href = "#";
        a.classList.add("lightbox-button");
        a.dataset.mediaId = this._id;
        const video = document.createElement("video");
        video.src = `assets/medias/${this._video}`;
        const span = document.createElement("span");
        span.textContent = `Aperçu - ${this._title}`;
        span.classList.add("video-text");

        a.appendChild(video);
        a.appendChild(span);
        article.appendChild(a);

        const informationDiv = document.createElement("div");
        informationDiv.classList.add("media-informations");
        const h2 = document.createElement("h2");
        h2.textContent = this._title;

        const likeDiv = document.createElement("div");
        likeDiv.classList.add("like-container");

        const likeNumber = document.createElement("div");
        likeNumber.textContent = this._likes;
        likeNumber.classList.add("like-number");
        const likeLogo = document.createElement("div");
        likeLogo.classList.add("fa-solid");
        likeLogo.classList.add("fa-heart");
        likeLogo.classList.add("like-logo");
        likeLogo.dataset.mediaId = this._id;
        likeLogo.ariaLabel = "Likes";
        likeLogo.tabIndex = 0;

        likeDiv.appendChild(likeNumber);
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
    incrementLike(likeLogo) {
        if (!this._isLiked) {
            this._likes++;
            likeLogo.previousSibling.textContent = this._likes;
            this._isLiked = true;
            likeLogo.style.color = "#901C1C";
        }
        else {
            this._likes--;
            likeLogo.previousSibling.textContent = this._likes;
            this._isLiked = false;
            likeLogo.style.color = "#DB8876";
        }
    }
}
