import jwt from "jsonwebtoken";
import User from '../../database/models/User.js'
const auth = async (token, roles = []) => {
    if (!token?.startsWith(process.env.BEARER_KEY)) {
        throw Error("In-valid bearer key");
    }
    token = token.split(process.env.BEARER_KEY)[1];
    if (!token) {
        throw Error("In-valid token");
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    if (!decoded?.id) {
        throw Error("In-valid token payload");
    }
    const authUser = await User.findById(decoded.id).select("-password");
    if (!authUser) {
        throw Error("Not register account");
    }
    if (!roles.includes(authUser.role)) {
        throw Error("not authorized");
    }
    return authUser;
};

export default graphAuth;
