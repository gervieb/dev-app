import { Request } from "express";
import { validationResult } from "express-validator";

export const validate = async (request: Request) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        throw errors.array({
            onlyFirstError: true,
        });
};
