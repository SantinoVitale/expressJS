import express from "express";
import { isAdmin, isUser } from "../middlewares/auth.js";
import { viewsController } from "../controller/views.controller.js";

const app = express()
export const viewsRouter = express.Router();


viewsRouter.get("/logout", viewsController.logout)

viewsRouter.get("/login", viewsController.login)

viewsRouter.get("/register", viewsController.register)

viewsRouter.get("/profile", isUser, viewsController.profile)

viewsRouter.get("/admin-only", isAdmin, viewsController.adminOnly)

viewsRouter.get("/admin-products", isAdmin, viewsController.adminProducts)

