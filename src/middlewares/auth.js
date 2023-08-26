import Cart from "../dao/cart.mongo.js";
import customError from "../errors/custom-error.js";
import EErros from "../errors/enum.js";

export function isUser(req, res, next) {
  if(req.user.email){
    return next()
  }
  return customError.createError({
    name: "Not loged",
    cause: "The user is not logged",
    message: "Please, log in",
    code: EErros.USER_PERMISSION_ERROR
  })
}
export function isAdmin(req, res, next){
  if(req.user.email && req.user.role === "admin"){
    return next();
  } else{
    req.logger.error("No es administrador")
    return customError.createError({
    name: "Not admin",
    cause: "The user is not an admin",
    message: "Please, log in as ADMIN",
    code: EErros.USER_PERMISSION_ERROR
  })
  }
  
  
}

export function isUserNotAdmin(req, res, next){
  if(req.user.email && req.user.role === "user"){
    return next()
  }
  return customError.createError({
    name: "Is admin",
    cause: "The user is an admin, but only user can use this chat",
    message: "Please, log in as a user",
    code: EErros.USER_PERMISSION_ERROR
  })
}

export async function isUserOwner(req, res, next){
  if(req.user.email && req.user.role === "user"){
    const cart = new Cart
    const userCart = await cart.getCartById(req.params.cid)
    if(userCart[0].users.email === req.user.email){
      return next();
    }
  }
  return customError.createError({
    name: "User is not owner",
    cause: "The user is not a cart owner",
    message: "Please, use the correct user cart or create one",
    code: EErros.USER_PERMISSION_ERROR
  })
}