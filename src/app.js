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
import { routerChat } from "./routes/chat.router.js";
import { chatService } from "./service/chat.service.js";
import { mockingProdcutsRouter } from "./routes/mockinproducts.router.js";
import errorHandler from "./middlewares/error.js"
import { addLogger } from "./utils/logger.js";
import { loggerTestRouter } from "./routes/loggerTestRouter.js";
import { recoverRouter } from "./routes/recover-pass.router.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

// * CONFIGURACION EXPRESS
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(addLogger)
const port = config.port;
export const mongourl = config.mongourl;
export const sshurl = config.sshurl;
export const apiUrl = config.apiUrl

const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        info:{
            title: "Documentacion del poder y saber",
            description: "API pensada para clase de swagger"
        }
    },
    apis: [__dirname + "/docs/**/*.yaml"]
}

const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// * CONEXIÓN A MONGO
connectMongo();

// * PERSISTENCIA DE SESSION CON MONGO
app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://s_vitale:svet5694@ecommercecluster.qhialqm.mongodb.net/', ttl: 86400 * 7}),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
initializatePassport();
app.use(passport.initialize());
app.use(passport.session());


// * CONFIGURACION CARPETA PUBLIC
app.use(express.static(path.join(__dirname + '../../public')));

// * CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "../../views");
app.set("view engine" , "handlebars");


// * ROUTER
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", loginRouter);
app.use("/mockingproducts", mockingProdcutsRouter);
app.use("/loggerTest", loggerTestRouter);

// * VISTA products
app.use("/vista/products", routerVistaProducts);
app.use("/vista/carts", routerVistaCarts);
app.use("/vista/users", vistaUsers);
app.use("/vista/chat", routerChat);
app.use("/", viewsRouter);
app.use("/recover-pass", recoverRouter);

// * HTML REAL TIPO VISTA
app.use("/vista/realtimeproducts", routerVistaRealTimeProducts);

/*app.get("*", (req, res) => {
    customError.createError({
        name: "Page not found",
        cause: "Reaching a invalid route",
        message: "Page does not exist",
        code: EErros.ROUTING_ERROR
    })
})*/

app.use(errorHandler)
const httpServer = app.listen(port, () => {
    console.log("Server escuchando en el puerto ", port)
})
const socketServer = new Server(httpServer);

/*socketServer.on("connection", async (socket) => {
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
})*/

// * CHAT SOCKET
socketServer.on("connection", async (socket) => {
    console.log("Socket connection established");
    async function getMessagesMongo() {
    try {
        const messagges = await chatService.getAllMessages();
        return messagges;
    } catch (error) {
        console.log(error);
        throw "ERROR";
    }
    }

    async function addMessageMongo(message) {
    try {
        await chatService.addMessage(message);
    } catch (error) {
        console.log(error);
        throw "ERROR";
    }
    }
    socket.on("msg_front_to_back", async (msg) => {
        console.log(msg);
        await addMessageMongo(msg);
        const msgs = await getMessagesMongo();
        console.log(msgs);
        socketServer.emit("todos_los_msgs", msgs);
    });
})
