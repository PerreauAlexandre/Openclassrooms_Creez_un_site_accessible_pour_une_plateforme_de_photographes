function getOriginURL(url) {  
    // On crée un objet URL à partir de l'URL de la page
    const objectURL = new URL(url);

    // On récupère l'origine de l'URL
    const parsedURL = objectURL.origin;

    // Retourner l'URL modifiée
    return parsedURL;
}