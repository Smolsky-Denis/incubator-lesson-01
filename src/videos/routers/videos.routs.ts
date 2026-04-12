import { Request, Response, Router } from 'express';
import {db} from "../../db/db";
import {IVideo} from "../types/types";
import {HttpStatus} from "../../core/types/http-statuses";
import {videosValidation} from "../validation/VideoInputDtoValidation";
import {ValidationError} from "../validation/validationError";

const createErrorMessages = (
      errors: ValidationError[],
  ): { errorMessages: ValidationError[] } => {
    return { errorMessages: errors };
  };

export const videosRouter = Router({})

  videosRouter

    .get("/", (req: Request, res: Response) => {
      // return all videos
      res.status(200).send(db.videos);
    })

    .post("/", (req: Request, res: Response) => {
      //1) проверяем приходящие данные на валидность
      const errors = videosValidation(req.body);

      if (errors.length > 0) {
        res.status(HttpStatus.methodNoteAllowed).send(createErrorMessages(errors));
        return;
      }

      //2) создаем newVideo
      const newVideo: IVideo = {
        id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
        createdAt: new Date(),
        ...req.body
      };
      //3) добавляем newVideo в БД
      db.videos.push(newVideo);
      //4) возвращаем ответ
      res.status(201).send(newVideo);
    })

    .get("/:id", (req: Request, res: Response) => {
      //поиск видео по id
      const id = Number(req.params.id)
      const video = db.videos.find((video) => video.id === id)
      if (!video) {
        res.status(HttpStatus.notFound).send('id doesn\'t exist')
      }
    })

    .put("/:id", (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const index = db.videos.findIndex(video => video.id === id)
      db.videos[index] = {...db.videos[index], ...req.body}
      res.sendStatus(HttpStatus.noContent)
    })

    .delete("/:id", (req: Request, res: Response) => {

      const id = Number(req.params.id)
      const index = db.videos.findIndex(video => video.id === id)
      if (index === -1) {
        res.sendStatus(HttpStatus.notFound)
      }
      db.videos.splice(index, 1)
      res.sendStatus(HttpStatus.noContent)
    })
