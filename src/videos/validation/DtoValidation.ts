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

  const validResolutions = ["P144","P240","P360","P480","P720","P1080","P1440","P2160"];

  if (
      !Array.isArray(data.availableResolutions) ||
      data.availableResolutions.length === 0 ||
      data.availableResolutions.some(r => !validResolutions.includes(r))
  ) {
    errors.push({
      field: "availableResolutions",
      message: errorMessages.availableResolutions
    });
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

  if (
      typeof data.publicationDate !== "string" ||
      Number.isNaN(Date.parse(data.publicationDate))
  ) {
    errors.push({
      field: "publicationDate",
      message: errorMessages.publicationDate
    });
  }

  const age = data.minAgeRestriction;

  if (
      age !== null && (
          typeof age !== 'number' ||
          age < 1 ||
          age > 18
      )
  ) {
    errors.push({
      field: 'minAgeRestriction',
      message: errorMessages.minAgeRestriction
    });
  }

  return errors
}

export const idValidation = (id: number) => {
  const errors: ValidationError[] = [];

  if (Number.isNaN(id) || id < 0) {
    errors.push({
      field: 'id',
      message: errorMessages.id
    });
  }

  return errors;
};
