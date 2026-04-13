import {ValidationError} from "./validationError";
import {errorMessages, maxLength} from "../../core/constants";
import {CreateVideoDataInputDTO, IdVideoDTO, IVideoInputDTO, PutVideoInputDTO} from "../dto/videos.input-dto";


export const createVideoDtoValidation = (data: CreateVideoDataInputDTO) => {
  const errors: ValidationError[] = [];
  if (!data.title || typeof data.title !== 'string' || data.title.length > maxLength.title) {
    errors.push({
      field: 'title',
      message: errorMessages.title
    })
  }

  if (!data.author || typeof data.author !== 'string' || data.author.length > maxLength.author) {
    errors.push({
      field: 'author',
      message: errorMessages.author
    })
  }

  if (!data.availableResolutions
      || !Array.isArray(data.availableResolutions)
      || !data.availableResolutions.length) {
    errors.push({
      field: 'availableResolutions',
      message: errorMessages.availableResolutions
    })
  }

  return errors
}

export const putDataDtoValidation = (data: PutVideoInputDTO) => {
  const errors = createVideoDtoValidation(data)

  if (!data.canBeDownloaded || typeof data.canBeDownloaded !== 'boolean') {
      errors.push({
        field: 'canBeDownloaded',
        message: errorMessages.canBeDownloaded
    })
  }

  if (!data.minAgeRestriction || typeof data.minAgeRestriction !== 'number'
      || data.minAgeRestriction <= 18 || data.minAgeRestriction >= 1) {
      errors.push({
        field: 'minAgeRestriction',
        message: errorMessages.minAgeRestriction
    })
  }

  return errors
}

export const idValidation = (id: number) => {
  const errors: ValidationError[] = [];
  if (Number.isNaN(id) || id < 1) {
    errors.push({
      field: 'id',
      message: errorMessages.id
    })
  }
  return errors
}


export const videosValidation = (data: IVideoInputDTO): ValidationError[] => {

  const errors: ValidationError[] = [];


  if (!data.id && typeof data.id !== 'number') {
    errors.push({
      field: 'id',
      message: errorMessages.id
    })
  }

  if (!data.title || typeof data.title !== 'string' || data.title.length > maxLength.title) {
    errors.push({
      field: 'title',
      message: errorMessages.title
    })
  }

  if (!data.author || typeof data.author !== 'string' || data.title.length > maxLength.author) {
    errors.push({
      field: 'author',
      message: errorMessages.author
    })
  }

  if (!data.canBeDownloaded || typeof data.canBeDownloaded !== 'boolean') {
    errors.push({
      field: 'canBeDownloaded',
      message: errorMessages.canBeDownloaded
    })
  }

  if (typeof data.minAgeRestriction !== 'number' || typeof data.minAgeRestriction !== null) {
    errors.push({
      field: 'minAgeRestriction',
      message: errorMessages.minAgeRestriction
    })
  }

  if (!data.createdAt || typeof data.createdAt !== "string") {
    errors.push({
      field: 'createdAt',
      message: errorMessages.createdAt
    })
  }

  if (!data.publicationDate || typeof data.publicationDate !== "string") {
    errors.push({
      field: 'publicationDate',
      message: errorMessages.publicationDate
    })
  }

  if (!data.availableResolutions
      || !Array.isArray(data.availableResolutions)
      || !data.availableResolutions.length) {
    errors.push({
      field: 'availableResolutions',
      message: errorMessages.availableResolutions
    })
  }

  return errors;
}
