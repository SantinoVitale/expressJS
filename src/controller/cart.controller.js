import customError from "../errors/custom-error.js"
import EErros from "../errors/enum.js"
import { cartsService } from "../service/cart.service.js"
import { usersService } from "../service/users.service.js"


class CartsController{
  async post(req, res){
    let {products} = req.body
    const cartPost = await cartsService.post(products, req.user)
    const userCartPost = await usersService.userCartPost(req.user._id.toString(), cartPost)
    return res.status(201).json({
      status:"success",
      msg: "product added",
      data:{cartPost}
    })
  }

  async getAll(req, res){
    const cartGetAll = await cartsService.getAll()
    return res.send({result: "success", payload: cartGetAll})
  }

  async getOne(req, res){
    let {cid} = req.params
    const cartsId = await cartsService.getOne(cid)
    if(cartsId){
    return res.status(200).json({status:"success",
      msg: "product finded",
      data:{cartsId}
    })
    } else{
    return customError.createError({
      name: "Cart not found",
      cause: "The cart does not found in the database",
      message: "Pls provide a correct cart id",
      code: EErros.CART_MANAGER_ERROR
    })
  }
  }

  async postProduct(req, res){
    let {cid} = req.params
    let {pid} = req.params
    let pQuantity = req.body
    const result = await cartsService.postProduct(cid, pid, pQuantity)
    if(result){
        return res.status(200).json({status:"success",
            msg: "product added to the cart",
            data:{result}
        })
    } else{
      return customError.createError({
        name: "Cant post a product in the cart",
        cause: "The porduct cant be added to the cart",
        message: "Pls provide a correct product id or a cart id",
        code: EErros.CART_MANAGER_ERROR
      })
    }
  }
  
  async deleteProduct(req, res){
    let {cid} = req.params
    let {pid} = req.params
    const finalResponse = await cartsService.deleteProduct(cid, pid)
    if(finalResponse){
      return res.status(200).json({status:"success",
      msg: "product deleted",
      data:{finalResponse}
    })
    } else{
      return customError.createError({
        name: "Cant delete product",
        cause: "The product does not found in the cart",
        message: "Pls provide a correct product id",
        code: EErros.CART_MANAGER_ERROR
      })
    }
  }

  async updateCart(req, res){
    let {cid} = req.params
    let {product, quantity} = req.body
    const result = await cartsService.updateCart(cid, req.body)
    if(result){
      return res.status(200).json({status:"success",
      msg: "product updated",
      data:{result}
    })
    } else{
      return customError.createError({
        name: "Cant update cart",
        cause: "The cart does not found in the database or the info to update isn´t correct",
        message: "Pls provide a correct cart id or product body",
        code: EErros.CART_MANAGER_ERROR
      })
    }
  }

  async updateProduct(req, res){
    let {cid} = req.params
    let {pid} = req.params
    let pQuantity = req.body
    const result = await cartsService.updateProduct(cid, pid, pQuantity)
    return res.json({
      result: result
    })
  }

  async emptyCart(req, res){
    let {cid} = req.params
    const update = await cartsService.deleteCart(cid)
    return res.json({
      result: update
    })
  }

  async purchase(req, res){
    let {cid} = req.params
    const cartInfo = await cartsService.purchase(cid, req.user)
    if(!cartInfo) return customError.createError({
      name: "No stock from the product",
      cause: "Cant do the purchase because there is no stock left",
      message: "Pls purchase a product with stock or wait to stock refill",
      code: EErros.CART_MANAGER_ERROR
    })
    return res.status(200).json({
      status:"success",
      msg: "product updated",
      data:{cartInfo}
    })
  }
}

export const cartsController = new CartsController()