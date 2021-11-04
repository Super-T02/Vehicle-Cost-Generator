import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// TODO: should be replaced with the database
const users = [
    {
        username: 'tom',
        password: 'password123admin',
        role: 'admin'
    },
    {
        username: 'shirin',
        password: 'password123member',
        role: 'member'
    }
];

router.post('/', (req, res) => {

    // TODO: outsourcing login
    const {username, password } = req.body;

    const actualUser = users.find(user => {
       return user.username === username
           && user.password === password;
    });

    if (actualUser) {
        // Generate JWT
        const accessToken =
            jwt.sign({
                username: actualUser.username,
                role: actualUser.role
            }, process.env.ACCES_TOKEN_SECRET as string);

        // Send JWT
        res.status(200).json({
            accessToken: accessToken
        });
    }
    else {
        res.status(404).json({
            err: 'Password or Username doesn\'t match',
        })
    }
});

export {router as authController};