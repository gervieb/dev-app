import mongoose from "mongoose";
import { promisify } from "util";
import crypto from "crypto";
import MailGun from "mailgun-js";
import config from "../config";

const randomBytesAsync = promisify(crypto.randomBytes);

export const randomString = async () => {
    return (await randomBytesAsync(64)).toString("hex");
};

export function sendEmail(
    from: string,
    to: string,
    title: string,
    message: string,
    html: string
) {
    return new Promise((resolve, reject) => {
        let mailgun = new MailGun({
            apiKey: config.MAILGUN_API_KEY,
            domain: config.MAILGUN_DOMAIN,
        });

        let data = {
            from: from
                ? from
                : `${config.EMAIL_NAME} <${config.EMAIL_FROM}>`,
            to: to,
            subject: title,
            text: message,
            html: html,
        };

        mailgun.messages().send(data, (error: any, body: any) => {
            if (error) {
                // TODO: log error
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}
