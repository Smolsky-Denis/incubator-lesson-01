import {AvailableResolutions} from "../../core/constants";

export interface IVideo {
        id: number
        title: string
        author: string
        canBeDownloaded: boolean
        minAgeRestriction: number
        createdAt: Date
        publicationDate: Date
        availableResolutions: AvailableResolutions
}

export interface Idb {
    videos: IVideo[]
}