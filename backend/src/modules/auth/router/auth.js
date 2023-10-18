import * as userController from '../controller/auth.js'
import {Router} from "express";

const router = Router()

router.post('/login',userController.login);
router.post('/signup',userController.signUp);


export default router