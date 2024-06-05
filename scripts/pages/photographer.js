function getPhotographerId () {
    // On récupère l'URL de la page
    const currentURL = window.location.href;

    // On crée un objet URL à partir de l'URL de la page
    const url = new URL(currentURL);

    // On récupère les paramètres
    const params = new URLSearchParams(url.search);

    // On accède à la valuer de ID
    const photographerId = params.get("id");
    console.log(photographerId);

    return photographerId;
}

async function displayMedia(medias) {
    const mediaSection = document.querySelector(".media-section");

    medias.forEach((media) => {
        const mediaModel = new MediaTemplateFactorie(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
}

async function initPhotographerPage() {
    // Récupère les datas du photographe et de ses différents médias
    const photographerId = parseInt(getPhotographerId());
    const { photographers, media } = await getDatas();
    // On récupère les données du photographe
    const photographer = photographers.find(photographer => photographer.id === photographerId);
    const photographerModel = new photographerTemplate(photographer);
    photographerModel.fillUserInformations();
    // On filtre les médias du photographe
    const photographerMedias = media.filter(media => media.photographerId === photographerId);
    displayMedia(photographerMedias);
}

initPhotographerPage();