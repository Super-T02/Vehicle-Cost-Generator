const express = require('express');
const userService = require("../services/userService");
const router = express.Router();

router.post('/', (req, res) => {
    // TODO: prove body

    userService.addUser(req, res, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(data);
        }
    });
});

module.exports = router;