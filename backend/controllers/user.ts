import express from "express";
import User from "../models/User";

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response) => {
    // TODO: check user Data
    const {body} = req;

    const newUser = new User(body.username, body.password, body.email, body.role);

    newUser.addToDB((err: Error, user: any) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.status(200).json({
                user: user
            });
        }
    });

});

export {router as userController};