import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { routerVistaCarts } from "./routes/vista.carts.router.js";
import { routerVistaProducts } from "./routes/vista.products.router.js";
import { routerVistaRealTimeProducts } from "./routes/realtime.products.router.js";
import { __dirname } from "./utils/dirname.js";
import path from "path";
import {productsRouter} from "./routes/products.router.js";
import { cartRouter} from "./routes/cart.router.js";
import {productModel} from "./dao/models/product.model.js"
import { viewsRouter } from "./routes/views.router.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo"
import session from 'express-session';
import { loginRouter } from "./routes/login.router.js";
import { vistaUsers } from "./routes/vista.users.router.js";
import passport from "passport";
import initializatePassport from "./config/passport.config.js";
import { connectMongo } from "./utils/mongoose.js";
import config from "./config/dotenv.config.js";


// * CONFIGURACION EXPRESS
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = config.port;
export const mongourl = config.mongourl;
export const sshurl = config.sshurl;

// * CONEXIÓN A MONGO
connectMongo();

// * PERSISTENCIA DE SESSION CON MONGO
app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://root:example@192.168.44.125:27017/ecommerce?authSource=admin', ttl: 86400 * 7}),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
initializatePassport()
app.use(passport.initialize())
app.use(passport.session())


// * CONFIGURACION CARPETA PUBLIC
app.use(express.static(path.join(__dirname + '../../public')));

// * CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "../../views")
app.set("view engine" , "handlebars") 


// * ROUTER
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/session", loginRouter)

// * VISTA products
app.use("/vista/products", routerVistaProducts)
app.use("/vista/carts", routerVistaCarts)
app.use("/vista/users", vistaUsers)
app.use("/", viewsRouter)

// * HTML REAL TIPO VISTA
app.use("/vista/realtimeproducts", routerVistaRealTimeProducts);

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Page Not Found",
        data: {}
    })
})
const httpServer = app.listen(port, () => {
    console.log("Server escuchando en el puerto ", port)
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

