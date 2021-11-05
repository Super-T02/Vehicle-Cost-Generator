import express from 'express';
import * as logger from './util/logger';
import cors from 'cors';
import {authController} from "./controllers/auth";
import {userController} from "./controllers/user";
const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(logger.logToConsole);

router.use('/auth', authController);
router.use('/user', userController);

router.use((_req: express.Request, res: express.Response) => {
  res.status(404);
  res.send('Route does not exist');
});

export { router as apiRouter }
