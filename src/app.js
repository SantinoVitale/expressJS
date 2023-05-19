import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/cart.router.js";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Page Not Found",
        data: {}
    })
})

app.listen(8080, () => {
    console.log("Server escuchando en el puerto 8080")
})