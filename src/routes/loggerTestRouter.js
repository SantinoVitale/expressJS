import express from "express";
import { loggerTestController } from "../controller/loggerTestController.js";

export const loggerTestRouter = express.Router();

loggerTestRouter.get("/", loggerTestController.get);