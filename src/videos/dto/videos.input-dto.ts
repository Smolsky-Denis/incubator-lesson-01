import {AvailableResolutions} from "../../core/constants";

export interface IVideoInputDTO {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: number | null
  createdAt: string
  publicationDate: string
  availableResolutions: AvailableResolutions[]
}

export type CreateVideoDataInputDTO = {
  title: string,
  author: string,
  availableResolutions: AvailableResolutions[]
}

export type PutVideoInputDTO = CreateVideoDataInputDTO & {
  canBeDownloaded: boolean,
  minAgeRestriction: number,
  publicationDate: string,
}