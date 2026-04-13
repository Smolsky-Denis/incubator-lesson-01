import { Request, Response, Router } from 'express';
import {db} from "../../db/db";
import {IVideo} from "../types/types";
import {HttpStatus} from "../../core/types/http-statuses";
import {createVideoDtoValidation, idValidation, putDataDtoValidation} from "../validation/DtoValidation";
import {ValidationError} from "../validation/validationError";

const createErrorMessages = (
    errors: ValidationError[],
): { errorsMessages: ValidationError[] } => {
  return { errorsMessages: errors };
};

export const videosRouter = Router({})

  videosRouter

    .get("/", (req: Request, res: Response) => {
      // return all videos
      res.status(200).send(db.videos);
    })

    .post("/", (req: Request, res: Response) => {
      //1) проверяем приходящие данные на валидность
      const errors = createVideoDtoValidation(req.body);

      if (errors.length > 0) {
        res.status(HttpStatus.badRequest).send(createErrorMessages(errors));
        return;
      }

      //2) создаем newVideo
      const now = new Date();
      const defaultVal = {
        minAgeRestriction: null,
        createdAt: now.toISOString(),
        canBeDownloaded: false,
        publicationDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      }
      const newVideo: IVideo = {
        id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 0,
        ...defaultVal,
        ...req.body,
      };
      //3) добавляем newVideo в БД
      db.videos.push(newVideo);
      //4) возвращаем ответ
      res.status(201).send(newVideo);
    })

    .get("/:id", (req: Request, res: Response) => {
      //поиск видео по id
      const id = Number(req.params.id)
      const errors = idValidation(id)
      if (errors.length > 0) {
        res.status(HttpStatus.notFound).send(createErrorMessages(errors));
        return;
      }
      const video = db.videos.find((video) => video.id === id)
      if (!video) {
        res.status(HttpStatus.notFound).send('id doesn\'t exist')
      }
      res.status(HttpStatus.success).send(video);
    })

    .put("/:id", (req: Request, res: Response) => {
      const errors = putDataDtoValidation(req.body)

      if (errors.length > 0) {
        res.status(HttpStatus.badRequest).send(createErrorMessages(errors));
        return;
      }

      const id = Number(req.params.id)
      const idErrors = idValidation(id)
      if (idErrors.length > 0) {
        res.status(HttpStatus.notFound).send(createErrorMessages(idErrors));
        return;
      }
      const index = db.videos.findIndex(video => video.id === id)

      if (index === -1) {
        res.status(HttpStatus.notFound).send('id doesn\'t exist')
        return;
      }

      db.videos[index] = {...db.videos[index], ...req.body}
      res.sendStatus(HttpStatus.noContent)
    })

    .delete("/:id", (req: Request, res: Response) => {

      const id = Number(req.params.id)
      const errors = idValidation(id)
      if (errors.length > 0) {
        res.status(HttpStatus.notFound).send(createErrorMessages(errors));
        return;
      }
      const index = db.videos.findIndex(video => video.id === id)
      if (index === -1) {
        res.sendStatus(HttpStatus.notFound)
      }
      db.videos.splice(index, 1)
      res.sendStatus(HttpStatus.noContent)
    })
