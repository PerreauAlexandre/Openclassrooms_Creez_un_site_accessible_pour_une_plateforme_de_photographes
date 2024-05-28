function modifyURL(url) {  
    // On crée un objet URL à partir de l'URL de la page
    const objectURL = new URL(url);

    // On récupère l'origine de l'URL
    const parsedURL = objectURL.origin;
    console.log(parsedURL);

    // Retourner l'URL modifiée
    return parsedURL;
}

async function getPhotographers() {
    // Récupération des photographes depuis l'API
    const reponse = await fetch(modifyURL(window.location.href) + "/data/photographers.json");
    const photographers = await reponse.json();
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    
