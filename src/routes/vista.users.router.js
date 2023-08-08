import express from "express";

import { vistaUsersController } from "../controller/vista.users.controller.js";

export const vistaUsers = express.Router();
vistaUsers.get("/", vistaUsersController.getAll)