function getPhotographerId () {
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
    likeLogo.classList.add("like-logo");

    totalLikes.appendChild(likeLogo);
}

async function initPhotographerPage() {
    // Récupère les datas du photographe et de ses différents médias
    const photographerId = parseInt(getPhotographerId());
    const { photographers, media } = await getDatas();
    
    // On récupère et on traite les données du photographe
    const photographer = photographers.find(photographer => photographer.id === photographerId);
    const photographerModel = new photographerTemplate(photographer);
    photographerModel.fillUserInformations();
    photographerModel.fillUserPrice();
    photographerModel.fillUserNameModal();

    // On filtre et on traite les médias du photographe
    const photographerMedias = media.filter(media => media.photographerId === photographerId);
    mediasModel = photographerMedias.map(photographerMedia => new MediaTemplateFactorie(photographerMedia));
    displayMedia();
    displayLikes();
}

let mediasModel = [];
let currentMediaIndex = 0;
const mediaSection = document.querySelector(".media-section");

initPhotographerPage();


// Gestion des éléments du form

const modalContainer = document.getElementById("contact_modal");
const form = document.querySelector(".form");

function displayModal() {
    modalContainer.style.display = "block";
}

function closeModal() {
    modalContainer.style.display = "none";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    modalContainer.style.display = "none";
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
}

const closeLightboxBtn = document.querySelector(".close-lightbox");
closeLightboxBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
    lightbox.style.display = "none";
}

const previousLightboxBtn = document.querySelector(".previous");
previousLightboxBtn.addEventListener("click", previousLightbox);

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

const filterBtn = document.querySelector(".filter");
filterBtn.addEventListener("change", (e) => {
    if (e.target.value === "Popularité") {
        mediasModel.sort((a, b) => {
            return b.likes - a.likes;
        });
        // console.log(mediasModel);
    }
    else if (e.target.value === "Date") {
        mediasModel.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate.getTime() - aDate.getTime();
        });
        // console.log(mediasModel);
    }
    else if (e.target.value === "Titre") {
        mediasModel.sort((a, b) => a.title.localeCompare(b.title));
        // console.log(mediasModel);
    }
    mediaSection.innerHTML="";
    displayMedia();
});
    