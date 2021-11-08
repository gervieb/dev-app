import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";

import loginValidation from "../validations/auth/login";
import { googleLogin, login, logout, refresh } from "../controllers/auth";
import { validate } from "../controllers/utils";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post(
    "/login",
    loginValidation,
    (request: Request, response: Response, next: NextFunction) => {
        validate(request).then(next).catch(next);
    },
    (request: Request, response: Response, next: NextFunction) => {
        login(request).then(next).catch(next);
    }
);

router.post(
    "/google",
    passport.authenticate("google-token", { session: false, scope: ['profile', 'email']}),
    (request: Request, response: Response, next: NextFunction) => {
        googleLogin(request).then(next).catch(next);
    }
);

router.get(
    "/logout",
    isAuthenticated("member"),
    (request: Request, response: Response, next: NextFunction) => {
        logout(request).then(next).catch(next);
    }
);

router.put(
    "/refresh",
    (request: Request, response: Response, next: NextFunction) => {
        refresh(request).then(next).catch(next);
    }
);

export default router;
