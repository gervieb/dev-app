import mongoose from "mongoose";

import config from "../config";

mongoose.connection.on("connected", () => {
    if (config.NODE_ENV !== "test") console.log("MongoDB is connected");
});

mongoose.connection.on("error", (err) => {
    console.log(`Could not connect to MongoDB because of ${err}`);
    process.exit(1);
});

export default {
    connect: async () => {
        mongoose.connect(process.env.MONGODB_URL, {
            keepAlive: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
        });
        return mongoose.connection;
    },
};
