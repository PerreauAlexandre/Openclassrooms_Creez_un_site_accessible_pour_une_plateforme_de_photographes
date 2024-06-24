function getOriginURL(url) {  
    // On crée un objet URL à partir de l'URL de la page
    const objectURL = new URL(url);

    // On récupère l'origine de l'URL
    const parsedURL = objectURL.origin;

    // Retourner l'URL modifiée
    if (parsedURL === "https://perreaualexandre.github.io") {
        return "https://perreaualexandre.github.io/Openclassrooms_Creez_un_site_accessible_pour_une_plateforme_de_photographes"
    }
    else {
        return parsedURL;
    }
}