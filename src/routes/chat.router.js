import express from "express";
import { chatController } from "../controller/chat.controller.js";
import { isUserNotAdmin } from "../middlewares/auth.js";

export const routerChat = express.Router();

routerChat.get("/", isUserNotAdmin, chatController.renderChat);