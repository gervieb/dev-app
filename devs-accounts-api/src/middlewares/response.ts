import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

import responseError from "../constants/errors/response";
import HttpException from "./http-exception";

export const handleNotFound = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(httpStatus.NOT_FOUND);
    response.json({
        message: responseError.NOT_FOUND,
    });
    response.end();
};

export const handleError = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(error.status || httpStatus.INTERNAL_SERVER_ERROR);
    response.json({
        message: error.message,
        errors: error,
    });
    response.end();
};

export const handleOk = (request: Request, response: Response, next: NextFunction) => {
    response.status(httpStatus.OK).json(request.responseData);
};

export const handleBadRequest = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const responseData = {
        message: error.message ? error.message : error,
    };
    return response.status(httpStatus.BAD_REQUEST).json(responseData);
};
