import express from "express";
import { checkAdmin, checkUser } from "../middlewares/auth.js";
import { viewsController } from "../controller/views.controller.js";

const app = express()
export const viewsRouter = express.Router();


viewsRouter.get("/logout", viewsController.logout)

viewsRouter.get("", viewsController.login)

viewsRouter.get("/login", viewsController.login)

viewsRouter.get("/register", viewsController.register)

viewsRouter.get("/profile", checkUser, viewsController.profile)

viewsRouter.get("/admin-only", checkAdmin, viewsController.adminOnly)

