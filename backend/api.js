const express = require('express');
const router = express.Router();

const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const logger = require('./util/logger');
const cors = require('cors');

router.use(cors());
router.use(express.json());
router.use(logger.logToConsole);

router.use('/auth', authController);
router.use('/users', userController);

router.use((req, res) => {
	res.status(404);
	res.send('Route does not exist');
});

module.exports = router;
