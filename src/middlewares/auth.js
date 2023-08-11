import Cart from "../dao/cart.mongo.js";

export function isUser(req, res, next) {
  if(req.user.email){
    return next()
  }
  return res.status(401).render("error-page", {msg: "pls log in"})
}
export function isAdmin(req, res, next){
  if(req.user.email && req.user.role === "admin"){
    return next();
  }
  return res.status(401).render("error-page", {msg: "pls log in as a ADMIN"})
}

export function isUserNotAdmin(req, res, next){
  if(req.user.email && req.user.role === "user"){
    return next()
  }
  return res.status(401).render("error-page", {msg: "ONLY USER CAN USE THE CHAT"})
}

export async function isUserOwner(req, res, next){
  if(req.user.email && req.user.role === "user"){
    const cart = new Cart
    const userCart = await cart.getCartById(req.params.cid)
    if(userCart[0].users.email === req.user.email){
      return next();
    }
  }
  return res.status(401).render("error-page", {msg: "NOT OWNER"})
}