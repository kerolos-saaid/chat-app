import jwt from "jsonwebtoken";

export function createToken(userDoc) {
    const payload = {
        username:userDoc.name,
        id: userDoc._id,
        email: userDoc.email
    };
    return jwt.sign(payload, process.env.TOKEN_SIGNATURE);
}