import * as dotenv from "dotenv";
dotenv.config();

export default {
    APP_ID: "brainio",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: process.env.PORT ?? 4002,
    MONGODB_URL:
        process.env.MONGODB_URL ??
        "mongodb+srv://devs-test:9yYMIQyUryQTryDx@cognition-dev.0ibod.mongodb.net/cognition-dev?retryWrites=true&w=majority",
    APP_SECRET: process.env.APP_SECRET,
    BASE_URL: process.env.BASE_URL ?? "http://localhost:4002",
    APP_URL: process.env.APP_URL ?? "http://localhost:4001",
    EMAIL_NAME: process.env.EMAIL_NAME,
    EMAIL_FROM: process.env.EMAIL_FROM,

    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
