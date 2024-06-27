class MediaTemplateFactorie {
    constructor(mediaData) {
        if (mediaData.image !== undefined) {
            return new ImageTemplate(mediaData);
        } else if (mediaData.video !== undefined) {
            return new VideoTemplate(mediaData);
        } else {
            throw "Unknown media format";
        }
    }
}
