import express from 'express';
import passport from 'passport';
import { loginController } from "../controller/login.controller.js"
import { uploader } from '../utils/multer.js';
import moment from 'moment-timezone';

export const loginRouter = express.Router();

loginRouter.post("/register", passport.authenticate("register", {failureRedirect: "/failRegister"}), loginController.register)

loginRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failLogin"}), loginController.login)

loginRouter.get("/github", passport.authenticate("github", {scope: ["user: email"]}))

loginRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), loginController.githubCallback)

loginRouter.get("/current", loginController.current)

loginRouter.get("/premium/:uid", loginController.setPremium)
loginRouter.get("/", loginController.get)
loginRouter.delete("/", loginController.deleteInactive)
loginRouter.post("/:uid/delete", loginController.delete)

loginRouter.post("/:uid/profiles", uploader.array("file-profiles"), loginController.postDocument)
loginRouter.post("/:uid/documents", uploader.array("file-documents"), loginController.postDocument)
loginRouter.post("/:uid/products", uploader.array("file-products"), loginController.postDocument)