import express from "express";
import { ProductManager } from "../utils.js";

export const routerVistaProducts = express.Router()
routerVistaProducts.get("/", (req, res) => {
  const pm = new ProductManager()
  const products = pm.getProducts()
  return res.render("home", {title: "products", products})
})