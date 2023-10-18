import * as chatController from "../controller/chat.js"
import {Router} from "express";
import auth from "../../../middlewares/auth.js";
const router = Router();
router.post('/',auth(),chatController.sendMessage);
router.get('/ovo/:destId',auth(),chatController.getChat);
export default router;