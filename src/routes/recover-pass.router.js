import express from "express";
import { recoverPassController } from "../controller/recover.pass.controller.js";

export const recoverRouter = express.Router()

recoverRouter.get("/", recoverPassController.getForm)

recoverRouter.post("/sendMail", recoverPassController.sendMail)

recoverRouter.get("/getMail", recoverPassController.getMail)

recoverRouter.post("/changePass", recoverPassController.changePass)