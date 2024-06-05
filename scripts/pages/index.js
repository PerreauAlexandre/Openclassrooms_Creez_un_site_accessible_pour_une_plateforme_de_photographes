async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function initIndexPage() {
    // Récupère les datas des photographes
    const { photographers } = await getDatas();
    displayData(photographers);
}

initIndexPage();