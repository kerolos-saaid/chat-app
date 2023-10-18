import jwt from "jsonwebtoken";
import User from '../../database/models/User.js'
import { StatusCodes } from "http-status-codes";
import {ErrorClass} from "../utilities/ErrorHandling/ErrorClass.js";
const auth = (roles = []) => {
    return async (req, res, next) => {
        console.log("GGGGGG")
        const { authorization } = req.headers;
        //if (!authorization?.startsWith(process.env.BEARER_KEY)) {
        //    return res.json({ message: "In-valid bearer key" });
        //}
        const token = authorization//.split(process.env.BEARER_KEY)[1];
        if (!token) {
            return res.json({ message: "In-valid token" });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
        if (!decoded?.id) {
            return res.json({ message: "In-valid token payload" });
        }
        const authUser = await User.findById(decoded.id).select("-password");
        if (!authUser) {
            return res.json({ message: "Not register account" });
        }
        //if (!authUser.confirmEmail)
        //    return next(new ErrorClass("email not confirmed", StatusCodes.FORBIDDEN));
        //if (!roles.includes(authUser.role)) {
        //   return res
        //        .status(StatusCodes.FORBIDDEN)
        //        .json({ message: "not authorized" });
        req.user = authUser;
        return next();
        }
    };

export default auth;
