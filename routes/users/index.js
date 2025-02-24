import {Router} from "express";
import {getAllUsers} from "../../controller/users.controllers.js";
import {isAdmin} from "../../middleware/auth.middleware.js";
const router = Router();

router.get(`/get-users`, isAdmin, getAllUsers);
router.get(`/get-user`);

export {router};
