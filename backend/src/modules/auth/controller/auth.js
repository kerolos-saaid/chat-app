import User from "../../../../database/models/User.js";
import bcryptjs from "bcryptjs";
import {createToken} from "../../../utilities/createToken.js";
import {StatusCodes} from "http-status-codes";
import {ErrorClass} from "../../../utilities/ErrorHandling/ErrorClass.js";

export const signUp = async (req, res, next) => {
    let {name, email, password} = req.body;
    const isEmailExist = await User.findOne({email});
    if (isEmailExist)
        return next(new ErrorClass("email already exist", StatusCodes.CONFLICT));
    password = bcryptjs.hashSync(password, +process.env.SALT_ROUND);
    await User.create({
        name,
        email,
        password
    });
    return res.status(StatusCodes.ACCEPTED).json({message: "done"});
};
export const login = async (req, res, next) => {
    const {email, password} = req.body;
    const checkEmail = await User.findOne({email});
    if (!checkEmail)
        return next(new ErrorClass("invalid login info", StatusCodes.BAD_REQUEST));
    const match = bcryptjs.compareSync(password, checkEmail.password);
    if (!match)
        return next(new ErrorClass("invalid login info", StatusCodes.BAD_REQUEST));
    const token = createToken(checkEmail)
    res.status(StatusCodes.ACCEPTED).json({message: "done", token});
};