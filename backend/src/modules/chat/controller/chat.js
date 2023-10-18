import {asyncHandler} from "../../../utilities/ErrorHandling/errorHandling.js";
import User from "../../../../database/models/User.js";
import {ErrorClass} from "../../../utilities/ErrorHandling/ErrorClass.js";
import {StatusCodes} from "http-status-codes";
import Chat from "../../../../database/models/Chat.js";
import {getIo} from "../../../utilities/socketio.js";

export const sendMessage = asyncHandler(
    async (req, res, next) => {
        const {message, destId} = req.body
        const destUser = await User.findById(destId)
        if (!destUser) return next( ErrorClass("Invalid user", StatusCodes.NOT_FOUND));
        const chat = await Chat.findOne(
            {
                $or:
                    [
                        {POne: req.user._id, PTwo: destId},
                        {PTwo: req.user._id, POne: destId}
                    ]
            }
        ).populate([{path: "POne"}, {path: "PTwo"}])
        if (!chat) await Chat.create(
            {
                POne: req.user._id,
                PTwo: destId,
                messages: [{
                    from: req.user._id,
                    to: destId,
                    message
                }]
            }
        )

        else {
            chat.messages.push({from: req.user._id, to: destId, message});
            await chat.save();
        }
        console.log(destUser.socketId)
        getIo().to(destUser.socketId).emit('receiveMessage', message)
        return res.status(StatusCodes.CREATED).json({message: "done", chat});
    }
)

export const getChat = asyncHandler(
    async (req, res, _) => {
        const {destId} = req.params;
        const chat = await Chat.findOne(
            {$or:
                    [
                        {POne: req.user._id, PTwo: destId},
                        {PTwo: req.user._id, POne: destId}
                    ]
            }
        ).populate([{path: "POne"}, {path: "PTwo"}])
    return res.status(StatusCodes.OK).json({message:"done",chat});
    }
)