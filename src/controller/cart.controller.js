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
    return res.status(400).json({status:"error",
    msg: "Not found",
    data:{}
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
        return res.status(400).json({status:"error",
            msg: "can´t added the product to the cart",
            data:{}
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
    return res.status(400).json({status:"error",
        msg: "can´t delete the product",
        data:{}
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
    return res.status(400).json({status:"error",
        msg: "can´t update the product",
        data:{}
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
    if(!cartInfo) return res.status(400).json({
      status: "error",
      msg: "The products in the cart have no stock remain"
    })
    return res.status(200).json({
      status:"success",
      msg: "product updated",
      data:{cartInfo}
    })
  }
}

export const cartsController = new CartsController()