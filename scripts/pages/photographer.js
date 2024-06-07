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

async function displayMedia(medias) {
    const mediaSection = document.querySelector(".media-section");

    const totalLikes = document.querySelector(".total-likes");

    let likes = 0;

    medias.forEach((media) => {
        const mediaModel = new MediaTemplateFactorie(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);

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
    // On récupère les données du photographe
    const photographer = photographers.find(photographer => photographer.id === photographerId);
    const photographerModel = new photographerTemplate(photographer);
    photographerModel.fillUserInformations();
    photographerModel.fillUserPrice();
    photographerModel.fillUserNameModal();
    // On filtre les médias du photographe
    const photographerMedias = media.filter(media => media.photographerId === photographerId);
    displayMedia(photographerMedias);
}

initPhotographerPage();


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
});