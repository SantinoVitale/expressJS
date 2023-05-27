import express from "express";

export const routerVistaRealTimeProducts = express.Router();

routerVistaRealTimeProducts.get("/", (req, res) => {
  return res.render("realtime-products", {});
});