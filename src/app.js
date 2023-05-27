import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { routerVistaProducts } from "./routes/vista.products.router.js";
import { routerVistaRealTimeProducts } from "./routes/realtime.products.router.js";
import { __dirname, ProductManager } from "./utils.js";
import path from "path";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// * CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine" , "handlebars") 

// * VISTA products
app.use("/vista/products", routerVistaProducts)

// * HTML REAL TIPO VISTA
app.use("/vista/realtimeproducts", routerVistaRealTimeProducts);


// * ENDPOINT TIPO API CON DATOS CRUDOS EN JSON
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Page Not Found",
        data: {}
    })
})
const httpServer = app.listen(8080, () => {
    console.log("Server escuchando en el puerto 8080")
})
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    const pm = new ProductManager()
    const getProducts = pm.getProducts()
    let products = getProducts
    socketServer.emit("get_products", products);
    socket.on("product_front_to_back", (addProduct) => {
        addProduct.id = +(Math.random() * 100000).toFixed(0);
        pm.addProduct(addProduct)
        socketServer.emit("get_products", products);
    });
    socket.on("delete_product_front_to_back", (id) => {
        pm.deleteProduct(+(id.value))
        socketServer.emit("get_products", products);
    })
})

