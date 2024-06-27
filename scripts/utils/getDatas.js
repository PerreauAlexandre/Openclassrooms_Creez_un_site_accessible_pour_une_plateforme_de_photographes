async function getDatas() {
    // Récupération des photographes depuis l'API
    const reponse = await fetch(getOriginURL(window.location.href) + "/data/photographers.json");
    const datas = await reponse.json();
    return datas;
}
