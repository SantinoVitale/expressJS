import express from "express";
import { isAdmin, isUser } from "../middlewares/auth.js";
import { viewsController } from "../controller/views.controller.js";

const app = express()
export const viewsRouter = express.Router();


viewsRouter.get("/logout", viewsController.logout)

viewsRouter.get("/login", viewsController.login)

viewsRouter.get("/failLogin", viewsController.failLogin)

viewsRouter.get("/register", viewsController.register)

viewsRouter.get("/failRegister", viewsController.failRegister)

viewsRouter.get("/profile", isUser, viewsController.profile)

viewsRouter.get("/admin-only", isAdmin, viewsController.adminOnly)

viewsRouter.get("/products-manager", isAdmin, (req, res) => {
  res.render("products-form", {role: req.user.role})
})

viewsRouter.get("/", (req, res) => {
  res.redirect("/vista/products")
})
