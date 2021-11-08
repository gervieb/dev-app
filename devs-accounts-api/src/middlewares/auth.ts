import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

import { validateToken } from "../controllers/jwt";
import { JWT } from "../constants/errors/auth";

export const isAuthenticated = (role: string) => {
    return (request: Request, response: Response, next: NextFunction) => {
        validateToken(request, role)
            .then(next)
            .catch(() => {
                const data = {
                    message: JWT.UNAUTHORIZED,
                };
                response.status(httpStatus.UNAUTHORIZED).json(data).end();
            });
    };
};
