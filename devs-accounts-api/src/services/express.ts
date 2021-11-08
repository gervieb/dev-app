import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
import passport from "passport";

import routes from "../routes";
import config from "../config";
import Mongoose from "./mongoose";

import "../passport";

import { handleNotFound, handleError } from "../middlewares/response";

const app = express();

const bodyParserObject = {
    extended: true,
    limit: "50mb",
};

const corsOptions = {
    origin: config.APP_URL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json(bodyParserObject));
app.use(passport.initialize());

app.use("/", routes);
app.use(handleNotFound);
app.use(handleError);

export default {
    app: app,
    start: async () => {
        app.locals.connections = await Mongoose.connect();
        app.listen(config.PORT, () => {
            console.log(`Server started on port ${config.PORT}`);
        });
    },
};
