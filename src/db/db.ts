import {Idb} from "../videos/types/types";
import {AvailableResolutions} from "../core/constants";

export const db: Idb = {
    videos: [{
        id: 1,
        title: 'Qwerty',
        author: 'Qwerty Qwerty',
        canBeDownloaded: true,
        minAgeRestriction: 5,
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions: AvailableResolutions.P144
    }]
}