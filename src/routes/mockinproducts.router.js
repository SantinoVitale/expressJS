import express from "express";
import { mockingProductController } from "../controller/mockingProducts.controller.js";


export const mockingProdcutsRouter = express.Router()

mockingProdcutsRouter.get("/", mockingProductController.get)