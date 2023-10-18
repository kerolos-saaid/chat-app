import * as userController from '../controller/user.js'
import {Router} from "express";
import auth from "../../../middlewares/auth.js";

const router = Router()

router.get('/',auth(),userController.usersList);


export default router