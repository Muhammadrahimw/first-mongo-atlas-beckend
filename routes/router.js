import {Router} from "express";
import {router as authRouter} from "./auth/index.js";
import {router as usersRouter} from "./users/index.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();
router.use(`/auth`, authRouter);
router.use(`/users`, verifyToken, usersRouter);

export {router};
