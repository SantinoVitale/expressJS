import express from 'express';
import { userModel } from '../dao/models/user.model.js';

export const loginRouter = express.Router();

loginRouter.post("/register", async (req, res) => {
  const { firstName, lastName, age, email, password, admin} = req.body;
  
  if (!firstName || !lastName || !age || !email || !password) {
    return res.status(400).render('error-page', { msg: 'faltan datos' });
  }
  try{
    await userModel.create({ firstName, lastName, age, email, password, admin})
    req.session.firstName = firstName
    req.session.email = email
    req.session.admin = admin ? true : false
    return res.redirect("/login");
  }
  catch (e){
    console.log(e);
    return res.status(400).render("error-page", {msg: "controla tu mail y intenta mas tarde"})
  }
})

loginRouter.post("/login", async(req,res) => {
  const { email, password} = req.body
  if(!email || !password) {
    return res.status(400).render("error-page", {msg: "faltan datos"})
  }
  try{
    const userFinded = await userModel.find({email: email, password: password})
    if(userFinded && userFinded[0].password === password){
      req.session.firstName = userFinded[0].firstName
      req.session.email = userFinded[0].email
      req.session.admin = userFinded[0].admin
      return res.redirect("/vista/products")
    }else {
      return res.status(400).render("error-page", {msg: "El email o la contraseña estan incorrectas"})
    }
  }
  catch (e){
    console.log(e);
    return res.status(400).render("error-page", {msg: "Hubo un error inesperado"})
  }
})