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
    if(userFinded !== []){
      console.log("se logueo correctamente");
    }else {
      console.log("a");
    }
  }
  catch (e){
    console.log(e);
    return res.status(400).render("error-page", {msg: "Hubo un error inesperado"})
  }
})