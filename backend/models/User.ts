import {UserToken} from "../util/interfaces/UserToken";
import * as db from "./db";
import { v4 as uuidv1 } from 'uuid';

export default class User implements UserToken{
    public id: string;
    public username: string;
    public password: string;
    public email: string;
    public role: 'admin' | 'member';


    constructor(username: string, password: string, email: string, role: "admin" | "member") {
        this.id = uuidv1();
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    /**
     * Adds the current User to the database
     * @param callback
     */
    public addToDB(callback: (err: Error, user: any) => any): void{
        console.log(this);

        db.user.insert(this as any, (err: Error, newDoc: {user: any}) => {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, newDoc);
            }
        });
    }
};