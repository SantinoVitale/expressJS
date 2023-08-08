import express from "express";


import { vistaProductsController } from "../controller/vista.products.controller.js";

export const routerVistaProducts = express.Router()
routerVistaProducts.get("/", vistaProductsController.getAll)