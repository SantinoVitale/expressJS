import express from "express";
import { cartModel } from "../dao/models/cart.model.js";

const app = express()
export const cartRouter = express.Router()

cartRouter.post("/", async (req, res) => {
  let {products} = req.params
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
