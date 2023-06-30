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
    req.session.admin = admin
    return res.redirect("/login");
  }
  catch (e){
    console.log(e);
    return res.status(400).render("error-page", {msg: "controla tu mail y intenta mas tarde"})
  }
})