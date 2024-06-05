class MediaTemplateFactorie {
    constructor(mediaData) {
        if (mediaData.image !== undefined) {
            return new imageTemplate(mediaData);
        } else if (mediaData.video !== undefined) {
            // return new Movie(mediaData);
        } else {
            throw "Unknown media format";
        }
    }
}