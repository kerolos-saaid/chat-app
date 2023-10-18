import connectDB from "../database/connection.js";
import userRouter from "./modules/user/router/user.js";
import {globalErrorHandling} from "./utilities/ErrorHandling/errorHandling.js";
import authRouter from "./modules/auth/router/auth.js";
import chatRouter from "./modules/chat/router/chat.js";
const bootstrap = (app) => {
    //convert Buffer Data
    //app.use(express.json());
    //Setup API Routing
    app.use(`/user`,userRouter);
    app.use(`/chat`, chatRouter);
    app.use(`/auth`, authRouter);

    app.all("*", (req, res) => {
        res.send("In-valid routing please check your url");
    });
    //app.use(globalErrorHandling);

    connectDB().then(_ => {
    });
};
export default bootstrap