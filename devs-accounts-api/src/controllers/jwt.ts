import { Request } from "express";
import { JWT } from "../constants/errors/auth";
import { verifyToken } from "../helpers/jwt";

export const validateToken = async (request: Request, role: string) => {
    try {
        const authorization = request.headers.authorization;
        if (!authorization) throw JWT.UNAUTHORIZED;
        const temporary = authorization.split(" ");
        const token = temporary.length > 0 && temporary[0] === "Bearer" ? temporary[1] : null;
        if (!token) throw JWT.UNAUTHORIZED;
        const user: any = await verifyToken(token);
        if (!user.roles.includes(role)) throw JWT.UNAUTHORIZED;
        request.user = user;
    } catch {
        throw JWT.UNAUTHORIZED;
    }
};
