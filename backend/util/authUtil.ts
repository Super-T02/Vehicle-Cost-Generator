import express from "express";
import jwt, {Secret} from "jsonwebtoken";


export const authenticateJWT =
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.sendStatus(401);
        }
        else {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.ACCES_TOKEN_SECRET as Secret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.body.user = user;
                next();
            });
        }

}