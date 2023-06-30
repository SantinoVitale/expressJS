import express from "express";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo"

const app = express()
export const viewsRouter = express.Router();


viewsRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.render("error-page", {msg: "no se pudo cerrar la session"});
        }
        return res.redirect("/login");
    })
})

viewsRouter.get("/login", (req, res) => {
    res.render("login-form");
})

viewsRouter.get("/register", (req, res) => {
    res.render("register-form");
})

viewsRouter.get("/profile", (req, res) => {
    res.render("profile");
})

viewsRouter.get("/admin-only", (req, res) => {
    res.send("ESTO ES SOLO PARA ADMINS")
})