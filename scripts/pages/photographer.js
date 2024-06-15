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

async function displayMedia(mediasModel) {
    const mediaSection = document.querySelector(".media-section");

    mediasModel.forEach((mediaModel) => {
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
}

async function displayLikes(mediasModel) {
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
    const mediasClass = photographerMedias.map(photographerMedia => new MediaTemplateFactorie(photographerMedia));
    displayMedia(mediasClass);
    displayLikes(mediasClass);
    mediasClass[8].fillLightbox();
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
    const inputFirstName = document.getElementById("first");
    console.log("Prénom : ", inputFirstName.value);
    const inputLastName = document.getElementById("last");
    console.log("Nom : ", inputLastName.value);
    const inputEmail = document.getElementById("email");
    console.log("Email : ", inputEmail.value);
    const inputMessage = document.getElementById("textarea");
    console.log("Message : ", inputMessage.value);
});