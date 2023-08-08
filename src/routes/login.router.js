import express from 'express';
import passport from 'passport';
import { loginController } from "../controller/login.controller.js"

export const loginRouter = express.Router();

loginRouter.post("/register", passport.authenticate("register", {failureRedirect: "/failregister"}), loginController.register)

loginRouter.get("/failRegister", loginController.failRegister)

loginRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failLogin"}), loginController.login)

loginRouter.get("/failLogin", loginController.failLogin)

loginRouter.get("/github", passport.authenticate("github", {scope: ["user: email"]}))

loginRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), loginController.githubCallback)

loginRouter.get("/current", loginController.current)