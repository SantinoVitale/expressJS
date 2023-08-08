import express from "express";

import { vistaCartsController } from "../controller/vista.carts.controller.js";

export const routerVistaCarts = express.Router()
routerVistaCarts.get("/:cid", vistaCartsController.getById)