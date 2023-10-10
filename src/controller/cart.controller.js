import customError from "../errors/custom-error.js"
import EErros from "../errors/enum.js"
import { cartsService } from "../service/cart.service.js"
import { usersService } from "../service/users.service.js"


class CartsController{
  async post(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {products} = req.body
    const cartPost = await cartsService.post(products, req.user);
    const userCartPost = await usersService.userCartPost(req.user._id.toString(), cartPost);
    return res.status(201).render("success", {
      status:"success",
      message: "Cart Created",
      payload:{userCartPost}
    })
  }

  async getAll(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    const cartGetAll = await cartsService.getAll()
    return res.send({result: "success", payload: cartGetAll})
  }

  async getOne(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {cid} = req.params
    const cartsId = await cartsService.getOne(cid);
    if(cartsId == []){
    return res.status(200).json({status:"success",
      msg: "product finded",
      data:{cartsId}
    })
    } else{
    req.logger.error('No se encontró ningun carrito');
    return customError.createError({
      name: "Cart not found",
      cause: "The cart does not found in the database",
      message: "Pls provide a correct cart id",
      code: EErros.CART_MANAGER_ERROR
    })
    
  }
  }

  async postProduct(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {cid} = req.params
    let {pid} = req.params
    let pQuantity = req.body
    const result = await cartsService.postProduct(cid, pid, pQuantity)
    if(result){
        const cartVista = await cartsService.getAllVista(cid)
        return res.render("carts", {h1title: cid + " cart´s" , cart: cartVista, cid: cid})
    } else{
      req.logger.error(`No se pudo actualizar los productos del carrito con el id: ${cid}`);
      return customError.createError({
        name: "Cant post a product in the cart",
        cause: "The porduct cant be added to the cart",
        message: "Pls provide a correct product id or a cart id",
        code: EErros.CART_MANAGER_ERROR
      })
    }
  }
  
  async deleteProduct(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {cid} = req.params
    let {pid} = req.params
    const finalResponse = await cartsService.deleteProduct(cid, pid)
    if(finalResponse){
      const cartVista = await cartsService.getAllVista(cid)
      return res.render("carts", {h1title: cid + " cart´s" , cart: cartVista, cid: cid})
    } else{
      req.logger.error(`No se pudo borrar los productos del carrito con el id: ${cid}`);
      return customError.createError({
        name: "Cant delete product",
        cause: "The product does not found in the cart",
        message: "Pls provide a correct product id",
        code: EErros.CART_MANAGER_ERROR
      })
    }
  }

  async updateCart(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {cid} = req.params
    let {product, quantity} = req.body
    const result = await cartsService.updateCart(cid, req.body)
    if(result){
      return res.status(200).json({status:"success",
      msg: "product updated",
      data:{result}
    })
    } else{
      req.logger.error(`No se pudo actualizar el carrito con el id: ${cid}`);
      return customError.createError({
        name: "Cant update cart",
        cause: "The cart does not found in the database or the info to update isn´t correct",
        message: "Pls provide a correct cart id or product body",
        code: EErros.CART_MANAGER_ERROR
      })
    }
  }

  async updateProduct(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {cid} = req.params
    let {pid} = req.params
    let pQuantity = req.body
    const result = await cartsService.updateProduct(cid, pid, pQuantity)
    return res.json({
      result: result
    })
  }

  async emptyCart(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {cid} = req.params
    const update = await cartsService.deleteCart(cid)
    return res.json({
      result: update
    })
  }

  async purchase(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    let {cid} = req.params
    const cartInfo = await cartsService.purchase(cid, req.user, req)
    if(!cartInfo.status) return res.status(400).render("error", {status: "error", title: cartInfo.title, cause: cartInfo.cause, message: cartInfo.cause})
    req.logger.debug(cartInfo)
    return res.status(200).render("success-purchase",{
      status:"success",
      message: "the purchase was successfully",
      noStockItems: cartInfo.itemsWithNoStock,
      ticket: cartInfo.ticket,
      redirect: "vista/carts/" + cid
    })
  }
}

export const cartsController = new CartsController()