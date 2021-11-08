import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";
import { JWT , login as loginError } from "../constants/errors/auth";
import { randomString } from "./utils";
import config from "../config";

const comparePassword = (candidatePassword: string, password: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (error, isMatch) => {
            if (error) reject(error);
            else resolve(isMatch);
        });
    });
};

export const createToken = async (
    userId: string,
    email: string,
    salt: string,
    accessTokenExp: string,
    refreshTokenExp: string
) => {

    const app = config.APP_ID;
    const secret = `${salt}${config.APP_SECRET}`;
    const payload = {
        id: userId,
        email: email,
    };
    const accessToken = jwt.sign(payload, secret, {
        expiresIn: accessTokenExp ? accessTokenExp : "7d",
    });
    const refreshToken = jwt.sign(
        {
            type: "refresh",
        },
        secret,
        {
            expiresIn: refreshTokenExp ? refreshTokenExp : "8d",
        }
    );
    await User.updateOne(
        {
            _id: userId
        },
        {
            $pull: {
                tokens: { provider: app },
            },
        }
    );
    await User.updateOne(
        {
            _id: userId
        },
        {
            $push: {
                tokens: {
                    provider: app,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    salt: salt,
                },
            },
        }
    );
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};

export const verifyToken = async (token: string) => {
    try {
        const app = config.APP_ID;
        const user: any = await User.findOne({
            "tokens.provider": app,
            "tokens.accessToken": token,
        });
        if (!user) throw JWT.INVALID;
        const tokens: any = user.tokens;
        if (!tokens) throw JWT.INVALID;
        const appToken: any = tokens.find(
            (token: any) => token.provider === app
        );
        if (!appToken) throw JWT.INVALID;
        const secret = `${appToken.salt}${config.APP_SECRET}`;
        const payload: any = await jwt.verify(appToken.accessToken, secret);
        if (payload && payload.email !== user.email) throw JWT.INVALID;
        return user;
    } catch (error: any) {
        throw error && error.name === "TokenExpiredError" ? JWT.INVALID : error;
    }
};

export const checkRefreshToken = (token: string, secret: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error) => {
            if (error)
                reject({
                    code: "refreshExpired",
                    message: "Refresh token expired - session ended.",
                });
            else resolve(true);
        });
    });
};

export const findAndGenerateToken = async (
    email: string,
    password: string | undefined
) => {
    try {
        const user: any = await User.findOne({
            email: email,
        });
        if (!user) throw loginError.FAILED;
        if(password !== undefined) {
            const passwordOK = await comparePassword(password, user.password);
            if (!passwordOK) throw loginError.FAILED;
        }
        const salt = await randomString();
        const token = await createToken(
            user._id,
            user.email,
            salt,
            null,
            null
        );
        return {
            _id: user._id,
            ...token,
            email: user.email,
            profile: user.profile,
            roles: user.roles,
        };
    } catch (error: any) {
        throw error;
    }
};
