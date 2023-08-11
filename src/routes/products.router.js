import express from "express";
import { productModel } from "../dao/models/product.model.js";
import { productsController } from "../controller/products.controller.js"
import { isAdmin } from "../middlewares/auth.js";

export const productsRouter = express.Router();

productsRouter.get("/", productsController.get)

productsRouter.post("/", isAdmin, productsController.post)

productsRouter.put("/:pid", isAdmin, productsController.put)

productsRouter.delete("/:pid", isAdmin, productsController.delete)