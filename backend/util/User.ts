import {UserToken} from "./interfaces/UserToken";

export default class User implements UserToken{
    id: string;
    username: string;
    password: string;
    role: 'admin' | 'member';


    constructor(id: string, username: string, password: string, role: "admin" | "member") {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
};