import Cart from "../dao/cart.mongo.js";
import { productModel } from "../dao/models/product.model.js";
import Product from "../dao/product.mongo.js";
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

export function isAdminOrPremium(req, res, next){
  if(req.user.email && req.user.role === "admin" || req.user.role === "premium"){
    return next();
  } else{
    req.logger.error("No es administrador o premium")
    return customError.createError({
    name: "Not admin or premium",
    cause: "The user is not an admin or premium",
    message: "Please, log in as ADMIN or a premium",
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
  if(req.user.email && req.user.role === "user" || req.user.email && req.user.role === "premium"){
    const product = new Product
    const userIsProduct = await product.getById(req.params.pid);
    console.log(userIsProduct);
    if(userIsProduct === req.user.email && req.user.role === "premium"){
      req.logger.error("El usuario no puede meter agregar el producto en el cual es dueño")
      return customError.createError({
        name: "User is product owner",
        cause: "The user is product owner",
        message: "Can´t add the product to the same owner",
        code: EErros.USER_PERMISSION_ERROR
      })
    } else {
      return next()
    }
  }
  return customError.createError({
    name: "User is not owner",
    cause: "The user is not a cart owner",
    message: "Please, use the correct user cart or create one",
    code: EErros.USER_PERMISSION_ERROR
  })
}

export async function isPremium(req, res, next){
  if(req.user.email && req.user.role === "premium"){
    const foundProduct = await productModel.findOne(req.params.pid)
    if(foundProduct.owner === req.user.email){
      return next()
    } else {
      req.logger.error("El usuario no tiene los permisos suficientes para borrar el producto")
      return customError.createError({
        name: "User is not owner",
        cause: "The user is not a product owner",
        message: "Please, use the correct user product id to delete it",
        code: EErros.USER_PERMISSION_ERROR
      })
    }
  } else if(req.user.email && req.user.role === "admin") {
    return next();
  } else {
    req.logger.error("Tiene que ser admin o premium para borrar un producto!")
    return customError.createError({
      name: "Permission error",
      cause: "The user is not admin or premium",
      message: "Please, log as a admin or as a premium",
      code: EErros.USER_PERMISSION_ERROR
    })
  }
}