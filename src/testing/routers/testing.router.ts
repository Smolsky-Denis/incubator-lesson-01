import {Router} from "express";
import {db} from "../../db/db";

export const testingRouter = Router();

testingRouter
    .delete("/all-data", (req, res) => {
        debugger
        db.videos = [];
        // res.sendStatus(HttpStatus.NoContent);
    })