import {Schema, model} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            min: [2, "minimum length 2 char"],
            max: [20, "maximum length 20 char"],
        },
        email: {
            type: String,
            unique: [true, "email must be unique value"],
            required: [true, "email is required"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        socketId: {type: String}
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);
export default User;
