import express from 'express';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

export const loginRouter = express.Router();

loginRouter.post("/register", passport.authenticate("register", {failureRedirect: "/failregister"}), async (req, res) => {
  res.send({status: "success", message: "User registered"})

  /*const { firstName, lastName, age, email, password, admin} = req.body;
  
  if (!firstName || !lastName || !age || !email || !password) {
    return res.status(400).render('error-page', { msg: 'faltan datos' });
  }
  try{
    await userModel.create({ firstName, lastName, age, email, password: createHash(password), admin})
    req.session.firstName = firstName
    req.session.email = email
    req.session.admin = admin ? true : false
    return res.redirect("/login");
  }
  catch (e){
    console.log(e);
    return res.status(400).render("error-page", {msg: "controla tu mail y intenta mas tarde"})
  }*/
})

loginRouter.get("/failRegister", async (req, res) => {
  console.log("Failed strategy");
  res.send({error: "failed"})
})

loginRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failLogin"}) ,async(req,res) => {
  if (!req.user) return res.status(400).send({status:"error", error:"Invalid credentials"})
  req.session.user = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role
  }
  return res.redirect("/vista/products")

  /*const { email, password} = req.body
  if(!email || !password) {
    return res.status(400).render("error-page", {msg: "faltan datos"})
  }
  try{
    const user = await userModel.findOne({email: email}, {email:1, firstName:1, lastName:1, age:1, password:1})
    if(!user) return res.status(400).send({status: "error", error: "User not found"})
    if(!isValidPassword(user, password)) return res.status(403).send({status: "error", error: "Incorrect password"})
    delete user.password
    req.session.firstName= user.firstName;
    req.session.email = email
    req.session.admin = user.admin
    return res.redirect("/vista/products")
  }
  catch (e){
    console.log(e);
    return res.status(400).render("error-page", {msg: "Hubo un error inesperado"})
  }*/
})

loginRouter.get("/failLogin", (req, res) => {
  res.send({error: "failed login"})
})

loginRouter.get("/github", passport.authenticate("github", {scope: ["user: email"]}), async (req, res) => {})

loginRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async(req, res )=> {
  req.session.user = req.user;
  return res.redirect("/vista/products")
})

loginRouter.get("/current", (req, res) => {
  return res.status(200).json({
    status: "success",
    msg: "datos de la sesion",
    payload: req.session.user
  })
})