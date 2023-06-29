import express from "express";
import cookieParser from "cookie-parser";

const app = express()
export const loginCookies = express.Router();
loginCookies.use(cookieParser());

loginCookies.get("/setCookies", (req, res) => {
    res.cookie("CoderCookie", "El mila es tremendo gil", {maxAge: 10000}).send("Cookie")
})

loginCookies.get("/getCookies", (req, res) => {
    res.send(req.cookies)
})