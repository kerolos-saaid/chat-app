import User from "../../../../database/models/User.js";
import {asyncHandler} from "../../../utilities/ErrorHandling/errorHandling.js";


export const usersList = asyncHandler(
    async (req, res) => {
        const users = await User.find({_id: {$ne: req.user._id}});
        return res.status(200).json({message: 'done', users})
    }
)

