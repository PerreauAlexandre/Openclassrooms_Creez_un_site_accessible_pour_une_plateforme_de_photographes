function modifyURL(url) {   
    let parsedURL = url;
    // Vérifier si le chemin se termine par .html
    if (url.endsWith(".html")) {
        // Trouver l'index du dernier '/'
        const lastSlashIndex = url.lastIndexOf("/");
        
        // Si un '/' est trouvé, supprimer la dernière partie de l'url
        if (lastSlashIndex !== -1) {
            parsedURL = url.substring(0, lastSlashIndex);
        }
    }
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
    
