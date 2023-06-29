import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { routerVistaCarts } from "./routes/vista.carts.router.js";
import { routerVistaProducts } from "./routes/vista.products.router.js";
import { routerVistaRealTimeProducts } from "./routes/realtime.products.router.js";
import { __dirname } from "./utils.js";
import path from "path";
import mongoose from "mongoose";
import {productsRouter} from "./routes/products.router.js";
import { cartRouter} from "./routes/cart.router.js";
import {productModel} from "./dao/models/product.model.js"
import { loginCookies } from "./routes/loginCookies.js";


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname, 'public')));

// * MONGOOSE

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://root:example@192.168.44.125:27017/ecommerce?authSource=admin", (error) => {
    if(error){
        console.log("Cannot connect to database", error);
    }
    console.log("conectado pa");
    
})
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)

// * CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine" , "handlebars") 

// * VISTA products
app.use("/vista/products", routerVistaProducts)
app.use("/vista/carts", routerVistaCarts)
app.use("/vista/login", loginCookies);

// * HTML REAL TIPO VISTA
app.use("/vista/realtimeproducts", routerVistaRealTimeProducts);

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

socketServer.on("connection", async (socket) => {
    let products = await productModel.find()
    socketServer.emit("get_products", products);
    socket.on("product_front_to_back", async (addProduct) => {
        let {title, description, price, code, thumbail, stock, category} = addProduct
        let result = await productModel.create({
            title,
            description,
            price,
            code,
            thumbail,
            stock,
            category
        })
        let products = await productModel.find()
        socketServer.emit("get_products", products);
    });
    socket.on("delete_product_front_to_back", async (id) => {
        let result = await productModel.deleteOne({_id:id.value})
        let products = await productModel.find()
        socketServer.emit("get_products", products);
    })
})

