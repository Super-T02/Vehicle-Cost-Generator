import express from "express";
import jwt, {Jwt, Secret} from "jsonwebtoken";
import User from "../models/User";
import {UserToken} from "./interfaces/UserToken";

export default class AuthUtil {
    static refreshTokens: string[] = [];

    constructor() {
    }

    /**
     * Middleware for authenticate a user.
     * After successful authentication the user data in the jwt payload will be
     * saved in the Request body in the variable 'user' ==> (req.body.user).
     * @param req
     * @param res
     * @param next
     */
    static authenticateJWT = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.sendStatus(401);
        }
        else {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.body.user = user;
                next();
            });
        }
    }

    /**
     * Generates a access token for the given User
     * @param user
     */
    static generateAccessToken = (user: UserToken): String => {
        // Payload sent with the jwt
        const payload = {
            username: user.username,
            role: user.role
        }

        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string);
    }

    /**
     * Generates a refresh token for the given User
     * @param user
     */
    static generateRefreshToken = (user: UserToken): String => {
        // Payload sent with the jwt
        const payload = {
            username: user.username,
            role: user.role
        }

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string);
        this.refreshTokens.push(refreshToken);

        return refreshToken;
    }
};

