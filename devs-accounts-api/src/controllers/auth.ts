import { Request } from "express";

import User from "../models/user";
import {
    checkRefreshToken,
    createToken,
    findAndGenerateToken,
} from "../helpers/jwt";
import { randomString } from "../helpers/utils";
import config from "../config";
import responseMessage from "../constants/message/response";
import { JWT } from "../constants/errors/auth";

export const googleLogin = async (request: Request) => {
    try {
        const user: any = request.user;
        const info = await findAndGenerateToken(user.email, undefined);
        request.responseData = info;
    } catch (error: any) {
        throw error;
    }
};

export const login = async (request: Request) => {
    try {
        const info = await findAndGenerateToken(
            request.body.email,
            request.body.password ?? ""
        );
        request.responseData = info;
    } catch (error: any) {
        throw error;
    }
};

export const logout = async (request: Request) => {
    try {
        const user: any = request.user;
        await User.updateOne(
            {
                _id: user?._id,
            },
            {
                $pull: {
                    tokens: { provider: config.APP_ID },
                },
            }
        );
        request.responseData = {
            message: responseMessage.LOGOUT_SUCCESS,
        };
    } catch (error) {
        throw error;
    }
};

export const refresh = async (request: Request) => {
    try {
        const refreshToken = request.body.refreshToken;
        if (refreshToken !== "") {
            const user: any = await User.findOne({
                "tokens.provider": config.APP_ID,
                "tokens.refreshToken": refreshToken,
            });
            if (!user) throw JWT.INVALID_REFRESH_TOKEN;
            const tokens: any = user.tokens;
            const appToken: any = tokens.find(
                (token: any) => token.provider === config.APP_ID
            );
            if (!appToken) throw JWT.INVALID_REFRESH_TOKEN;
            const secret = `${appToken.salt}${config.APP_SECRET}`;
            const valid = await checkRefreshToken(refreshToken, secret);
            if (valid === true) {
                const salt = await randomString();
                request.responseData = await createToken(
                    user._id,
                    user.email,
                    salt,
                    null,
                    null
                );
            } else {
                throw JWT.INVALID_REFRESH_TOKEN;
            }
        } else {
            throw JWT.INVALID_REFRESH_TOKEN;
        }
    } catch (error) {
        throw error;
    }
};
