import {Router} from "express";
import {db} from "../../db/db";
import {HttpStatus} from "../../core/types/http-statuses";

export const testingRouter = Router();

testingRouter
    .delete("/all-data", (req, res) => {
        debugger
        db.videos = [];
        res.sendStatus(HttpStatus.noContent);
    })