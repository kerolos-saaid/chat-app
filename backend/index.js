import express from "express"
import dotenv from "dotenv"
import bootstrap from "./src/index.router.js";
import User from "./database/models/User.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import {initIo} from "./src/utilities/socketio.js";

dotenv.config()
const port = Number(process.env.PORT) || 5000;
const app = express();
app.use(cors())
bootstrap(app);
const httpServer = app.listen(port);
const io = initIo(httpServer);
io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("updateSocketId", async (data) => {
        const {id} = jwt.verify(data.token, process.env.TOKEN_SIGNATURE);
        await User.updateOne({_id: id}, {socketId: socket.id})
        socket.emit("updatedSocketId", "done")
    })
})