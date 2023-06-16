import express from "express";
import { cartModel } from "../dao/models/cart.model.js";

const app = express()
export const cartRouter = express.Router()

cartRouter.post("/", async (req, res) => {
  let {products} = req.body
  let result = await cartModel.create({products})
  if(result){
    res.status(201).json({status:"success",
      msg: "product added",
      data:{result}
    })
  } else {
    res.status(400).json({status:"error", msg: "asegurese de rellenar todos los campos", data:{} })
  }
})

cartRouter.get("/", async(req, res) => {
  try{
    let carts = await cartModel.find()
    
    res.send({result: "success", payload: carts})
  } catch(error){
    console.log("Hubo un error: ", error);
  }
})

cartRouter.get("/:cid", async (req, res) => {
  let {cid} = req.params
  let cartsId = await cartModel.find({_id:cid}).populate("products.product")
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
})

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  let {cid} = req.params
  let {pid} = req.params
  let pQuantity = req.body
  let sameQ = await cartModel.find({_id: cid})
  const findRepeatedProduct = sameQ[0].products.find((e) => JSON.stringify(e.product) === JSON.stringify(pid))
  if(findRepeatedProduct){
    findRepeatedProduct.quantity += pQuantity.quantity
    sameQ.products = findRepeatedProduct
  } else {
    sameQ[0].products.push({product: pid, quantity: pQuantity.quantity})
  }
  let result = await cartModel.updateOne({_id: cid}, sameQ[0])
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
})

cartRouter.delete(("/:cid/products/:pid"), async(req, res) => {
  let {cid} = req.params
  let {pid} = req.params
  let result = await cartModel.find({_id: cid})
  const product = result[0].products.filter((e) => JSON.stringify(e.product) !== JSON.stringify(pid))
  const update = result[0].products = product
  let finalResponse = await cartModel.updateOne({_id: cid}, {products: product})
  if(finalResponse){
    return res.status(200).json({status:"success",
    msg: "product deleted",
    data:{product}
  })
  } else{
  return res.status(400).json({status:"error",
      msg: "can´t delete the product",
      data:{}
  })
  }
})

cartRouter.put(("/:cid"), async (req, res) => {
  let {cid} = req.params
  let {product, quantity} = req.body
  let result = await cartModel.updateOne({_id: cid}, {products: req.body})
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
})

cartRouter.put(("/:cid/products/:pid"), async (req, res) => {
  let {cid} = req.params
  let {pid} = req.params
  let pQuantity = req.body
  let result = await cartModel.find({_id: cid})
  const findProduct = result[0].products.find((e) => JSON.stringify(e.product) === JSON.stringify(pid))
  if(findProduct){
    findProduct.quantity = pQuantity.quantity
    let update = await cartModel.updateOne({_id: cid}, result[0])
    return res.status(200).json({status:"success",
            msg: "product quantity edited",
            data:{update}
        })
  } else {
    return res.status(400).json({status:"error",
            msg: "can´t edit the product",
            data:{}
        })
  }
  
})

cartRouter.delete(("/:cid"), async(req, res) => {
  let {cid} = req.params
  let update = await cartModel.updateOne({_id: cid}, {products: []})
  console.log(update);
})