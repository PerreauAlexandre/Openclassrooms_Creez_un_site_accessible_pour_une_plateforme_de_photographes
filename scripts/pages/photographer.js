let mediasModel = [];
let currentMediaIndex = 0;
const mediaSection = document.querySelector(".media-section");
const main = document.getElementById("main");
const header = document.getElementById("header");

initPhotographerPage();


// Photographer page functions

function getPhotographerId() {
    // On récupère l'URL de la page
    const currentURL = window.location.href;

    // On crée un objet URL à partir de l'URL de la page
    const url = new URL(currentURL);

    // On récupère les paramètres
    const params = new URLSearchParams(url.search);

    // On accède à la valuer de ID
    const photographerId = params.get("id");

    return photographerId;
}

function displayMedia() {
    mediasModel.forEach((mediaModel) => {
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });

    // On crée les évènement au clic pour lancer la lightbox
    const lightboxButtons = document.querySelectorAll(".lightbox-button");
    lightboxButtons.forEach((lightboxButton) => lightboxButton.addEventListener("click", (e) => {
        e.preventDefault();
        // On lance la fonction qui ouve la lightbox en fonction de l'Id media stocké en dataset
        launchLightbox(parseInt(lightboxButton.dataset.mediaId));
    }));

    // On crée les évènement au clic pour gérer les likes
    const likesButtons = document.querySelectorAll(".like-logo");
    likesButtons.forEach((likeButton) => likeButton.addEventListener("click", () => likeMedia(likeButton)));
}

function displayLikes() {
    const totalLikes = document.querySelector(".total-likes");
    let likes = 0;
    mediasModel.forEach((mediaModel) => {
        likes += mediaModel.likes;
    });

    totalLikes.textContent = likes;
    const likeLogo = document.createElement("i");
    likeLogo.classList.add("fa-solid");
    likeLogo.classList.add("fa-heart");
    likeLogo.classList.add("footer-like-logo");

    totalLikes.appendChild(likeLogo);
}

async function initPhotographerPage() {
    // Récupère les datas du photographe et de ses différents médias
    const photographerId = parseInt(getPhotographerId());
    const {photographers, media} = await getDatas();

    // On récupère et on traite les données du photographe
    const photographer = photographers.find(photographer => photographer.id === photographerId);
    const photographerModel = new PhotographerTemplate(photographer);
    photographerModel.fillUserInformations();
    photographerModel.fillUserPrice();
    photographerModel.fillUserNameModal();

    // On filtre et on traite les médias du photographe
    const photographerMedias = media.filter(media => media.photographerId === photographerId);
    mediasModel = photographerMedias.map(photographerMedia => new MediaTemplateFactorie(photographerMedia));
    displayMedia();
    displayLikes();
}


// Gestion des éléments du form

const modalContainer = document.getElementById("contact_modal");
const form = document.querySelector(".form");

document.querySelector(".close-modal").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        closeModal();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

function displayModal() {
    modalContainer.style.display = "block";
    document.getElementById("first").focus();
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("inert", "true");
    header.setAttribute("inert", "true");
}

function closeModal() {
    modalContainer.style.display = "none";
    main.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "false");
    main.removeAttribute("inert");
    header.removeAttribute("inert");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    modalContainer.style.display = "none";
    main.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "false");
    main.removeAttribute("inert");
    header.removeAttribute("inert");
    const inputFirstName = document.getElementById("first");
    console.log("Prénom : ", inputFirstName.value);
    const inputLastName = document.getElementById("last");
    console.log("Nom : ", inputLastName.value);
    const inputEmail = document.getElementById("email");
    console.log("Email : ", inputEmail.value);
    const inputMessage = document.getElementById("textarea");
    console.log("Message : ", inputMessage.value);
});


// Gestion des éléments de la lightbox

const lightbox = document.querySelector(".lightbox");

function launchLightbox(mediaId) {
    lightbox.style.display = "flex";
    const mediaIndex = mediasModel.findIndex(media => media.id === mediaId);
    mediasModel[mediaIndex].fillLightbox();
    currentMediaIndex = mediaIndex;
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("inert", "true");
    header.setAttribute("inert", "true");
}

const closeLightboxBtn = document.querySelector(".close-lightbox");
closeLightboxBtn.addEventListener("click", closeLightbox);

closeLightboxBtn.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        closeLightbox();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = "none";
    main.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "false");
    main.removeAttribute("inert");
    header.removeAttribute("inert");
}

const previousLightboxBtn = document.querySelector(".previous");
previousLightboxBtn.addEventListener("click", previousLightbox);

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "ArrowRight") {
        nextLightbox();
    } else if (key === "ArrowLeft") {
        previousLightbox();
    }
});

function previousLightbox() {
    if (currentMediaIndex === 0) {
        currentMediaIndex = mediasModel.length - 1;
    }
    else {
        currentMediaIndex--;
    }
    mediasModel[currentMediaIndex].fillLightbox();
}

const nextLightboxBtn = document.querySelector(".next");
nextLightboxBtn.addEventListener("click", nextLightbox);

function nextLightbox() {
    if (currentMediaIndex === mediasModel.length - 1) {
        currentMediaIndex = 0;
    }
    else {
        currentMediaIndex++;
    }
    mediasModel[currentMediaIndex].fillLightbox();
}


// Gestion des likes

function likeMedia(likeButton) {
    const mediaIndex = mediasModel.findIndex(media => media.id === parseInt(likeButton.dataset.mediaId));
    mediasModel[mediaIndex].incrementLike(likeButton);
    displayLikes();
}


// Filtre

const dropBtn = document.querySelector(".drop-btn");
const dropdownContent = document.querySelector(".dropdown-content");
dropBtn.addEventListener("click", () => {
    dropBtn.style.display = "none";
    dropdownContent.style.display = "flex";
    dropBtn.setAttribute("aria-expanded", "true");
});

const sortChoices = document.querySelectorAll(".sort-choice");
sortChoices.forEach((sortChoice) => sortChoice.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    dropdownContent.style.display = "none";
    const dropBtnDiv = dropBtn.querySelector("div");
    dropBtnDiv.innerText = sortChoice.dataset.sort;
    dropBtn.style.display = "flex";
    dropBtn.setAttribute("aria-expanded", "false");
    if (sortChoice.classList.contains("sort-choice--second")) {
        const actualSortChoiceFirst = document.querySelector(".sort-choice--first");
        sortChoice.classList.remove("sort-choice--second");
        sortChoice.classList.add("sort-choice--first");
        actualSortChoiceFirst.classList.remove("sort-choice--first");
        actualSortChoiceFirst.classList.add("sort-choice--second");
    }
    else if (sortChoice.classList.contains("sort-choice--third")) {
        const actualSortChoiceFirst = document.querySelector(".sort-choice--first");
        sortChoice.classList.remove("sort-choice--third");
        sortChoice.classList.add("sort-choice--first");
        actualSortChoiceFirst.classList.remove("sort-choice--first");
        actualSortChoiceFirst.classList.add("sort-choice--third");
    }
    if (sortChoice.dataset.sort === "Popularité") {
        mediasModel.sort((a, b) => {
            return b.likes - a.likes;
        });
        // console.log(mediasModel);
    }
    else if (sortChoice.dataset.sort === "Date") {
        mediasModel.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate.getTime() - aDate.getTime();
        });
        // console.log(mediasModel);
    }
    else if (sortChoice.dataset.sort === "Titre") {
        mediasModel.sort((a, b) => a.title.localeCompare(b.title));
        // console.log(mediasModel);
    }
    mediaSection.innerHTML="";
    displayMedia();
}));
