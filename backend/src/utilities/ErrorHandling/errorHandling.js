import { ErrorClass } from "./ErrorClass.js";

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch((error) => {
            return next(new ErrorClass(error.message, error.status || 500));
        });
    };
};

export const globalErrorHandling = (error, req, res,_) => {
    return res
        .status(error.status || 500)
        .json({ status: error.status || 500, error: error.message });
};
