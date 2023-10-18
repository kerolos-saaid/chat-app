import mongoose from "mongoose";

const connectDB = async () => {
    const db_uri = process.env.DB_ONLINE || process.env.DB_LOCAL

    return await mongoose
        .connect(db_uri)
        .then((_) => {
            console.log(`DB Connected successfully on .........`);
            return true
        })
        .catch((err) => console.log(`Fail to connect  DB.........${err} `));
};

export default connectDB;
