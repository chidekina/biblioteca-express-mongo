import mongoose, {mongo} from "mongoose";

async function connectionToDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
   
    return mongoose.connection;
};

export default connectionToDatabase;

