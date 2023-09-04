import express from "express";
import { productModel } from "../dao/models/product.model.js";
import { productsController } from "../controller/products.controller.js"
import { isAdmin, isPremium } from "../middlewares/auth.js";

export const productsRouter = express.Router();

productsRouter.get("/", productsController.get)

productsRouter.post("/", productsController.post)

productsRouter.put("/:pid", productsController.put)

productsRouter.post("/delete",  isPremium, productsController.delete)