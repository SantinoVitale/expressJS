import express from "express";
import { cartsController } from "../controller/cart.controller.js";
import { isUserOwner } from "../middlewares/auth.js";

const app = express()
export const cartRouter = express.Router()

cartRouter.post("/", cartsController.post)

cartRouter.get("/", cartsController.getAll)

cartRouter.get("/:cid", cartsController.getOne)

cartRouter.post("/:cid/products/:pid", isUserOwner, cartsController.postProduct)

cartRouter.delete(("/:cid/products/:pid"), cartsController.deleteProduct)

cartRouter.put(("/:cid"), cartsController.updateCart)

cartRouter.put(("/:cid/products/:pid"), cartsController.updateProduct)

cartRouter.delete(("/:cid"), cartsController.emptyCart)