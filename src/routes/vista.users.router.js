import express from "express";

import { vistaUsersController } from "../controller/vista.users.controller.js";
import { isAdmin } from "../middlewares/auth.js";

export const vistaUsers = express.Router();
vistaUsers.get("/", vistaUsersController.getAll)

vistaUsers.get("/users-manager", isAdmin, vistaUsersController.getManager)