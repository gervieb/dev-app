import { Request, Router, Response } from "express";

import { handleBadRequest, handleOk } from "../middlewares/response";

import auth from "./auth";

const router = Router();

router.get("/", (request: Request, response: Response) => {
    response.json({
        version: "1.0.0",
    });
});

router.use("/auth", auth, handleOk, handleBadRequest);

export default router;
