import {Router} from "express";
import {
	verifyUser,
	signIn,
	signUp,
	signInMail,
	verifySignInMail,
	updateMail,
} from "../../controller/auth.controller.js";
import {verifyToken} from "../../middleware/auth.middleware.js";
const router = Router();

router.post(`/sign-in`, signIn);
router.post(`/sign-in-mail`, signInMail);
router.post(`/sign-in-verify`, verifySignInMail);
router.post(`/sign-up`, signUp);
router.post(`/verify-user`, verifyUser);
router.post(`/update-mail`, verifyToken, updateMail);
export {router};
