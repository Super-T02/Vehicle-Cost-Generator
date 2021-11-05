import {UserToken} from "./interfaces/UserToken";
import User from "../models/User";
import * as db from '../models/db';

export default class UserUtil {

    /**
     * Checks the login data for the user
     * @param userData
     * @param callback
     */
    public static login(userData: { username: string, password: string },
                             callback: (err: Error, user: UserToken) => any): void {
        const user = db.user.find((u: { username: string; password: string; }) => {
            return u.username == userData.username && u.password == userData.password
        }, (err: Error, data: any) => {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, data);
            }
        });
    }
};