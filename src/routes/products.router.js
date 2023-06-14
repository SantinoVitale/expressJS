import express from "express";
import { productModel } from "../dao/models/product.model.js";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try{
    let products = await productModel.find()
    res.send({result: "success", payload: products})
  } catch(error){
    console.log("Hubo un error", error);
  }
})

productsRouter.post("/", async(req, res) => {
  let {title, description, price, code, thumbail, stock, category} = req.body
    if(!title||!description||!price||!code||!stock||!category){
        res.status(400).json({status:"error",
                msg: "incomplete values",
                data:{}
        })
    }else {
  
        let result = await productModel.create({
          title,
          description,
          price,
          code,
          thumbail,
          stock,
          category
        })
        if(result){
            res.status(201).json({status:"success",
                    msg: "product added",
                    data:{result}
                })
        } else {
            res.status(400).json({status:"error", msg: "asegurese de rellenar todos los campos", data:{} })
        }
    }
})

productsRouter.put("/:pid", async (req, res) => {
  let {pid} = req.params
  let productToReplace = req.body
  if(!productToReplace.title||!productToReplace.description||!productToReplace.price||!productToReplace.code||!productToReplace.stock||!productToReplace.category){
    res.status(400).json({status:"error",
                msg: "incomplete values",
                data:{}
            })
  } else{
    let result = await productModel.updateOne({_id:pid}, productToReplace)
    res.status(200).json({
      status:"success",
      msg: "product updated",
      data:{result}
    })
  }
})

productsRouter.delete("/:pid", async(req, res) => {
  let {pid} = req.params
  let result = await productModel.deleteOne({_id:pid})
  res.status(200).json({
    status:"success",
    msg: "product deleted",
    data:{result}
  })
})