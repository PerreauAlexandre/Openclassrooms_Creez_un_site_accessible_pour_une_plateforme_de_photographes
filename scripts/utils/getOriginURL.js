// function getOriginURL(url) {  
//     // // On crée un objet URL à partir de l'URL de la page
//     // const objectURL = new URL(url);

//     // // On récupère l'origine de l'URL
//     // const parsedURL = objectURL.origin;

//     // // Retourner l'URL modifiée
//     // return parsedURL;

// }

function getOriginURL(url) {
    try {
        // Crée un objet URL à partir de l'URL donnée
        let urlObject = new URL(url);

        // Si le chemin se termine par un fichier (ex : page.html), enlève ce fichier
        if (urlObject.pathname.endsWith('/')) {
            // Si le chemin se termine par '/', on le garde tel quel
            return urlObject.origin + urlObject.pathname;
        } else {
            // Sinon, enlève la dernière partie du chemin
            let basePath = urlObject.pathname.substring(0, urlObject.pathname.lastIndexOf('/') + 1);
            return urlObject.origin + basePath;
        }
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

// Exemples d'utilisation :
console.log(getOriginURL("https://perreaualexandre.github.io/Openclassrooms_Creez_un_site_accessible_pour_une_plateforme_de_photographes/#")); // https://perreaualexandre.github.io/Openclassrooms_Creez_un_site_accessible_pour_une_plateforme_de_photographes/
console.log(getOriginURL("http://127.0.0.1:5500/photographer.html?id=243")); // http://127.0.0.1:5500/
console.log(getOriginURL("https://perreaualexandre.github.io/Openclassrooms_Creez_un_site_accessible_pour_une_plateforme_de_photographes/index.html")); // https://perreaualexandre.github.io/Openclassrooms_Creez_un_site_accessible_pour_une_plateforme_de_photographes/
console.log(getOriginURL("http://127.0.0.1:5500/index.html")); // http://127.0.0.1:5500/
console.log(getOriginURL("https://example.com/custom_base_path/some/other/path")); // https://example.com/custom_base_path/
console.log(getOriginURL("https://example.com/custom_base_path/")); // https://example.com/custom_base_path/
console.log(getOriginURL("https://example.com/custom_base_path")); // https://example.com/custom_base_path/