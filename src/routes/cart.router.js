import express from "express";
import { Cart } from "../utils.js";


const app = express()
export const cartRouter = express.Router()

cartRouter.post("/", (req, res) => {
    const cartBody = req.body
    if(cartBody.id){
        res.status(400).json({status:"error",
                msg: "do not post an id",
                data:{}
            })
    }else {
        cartBody.id = +(Math.random() * 100000).toFixed(0);
        const c = new Cart()
        const newCart = c.createCart(cartBody)
        if(newCart){
            res.status(201).json({status:"success",
                    msg: "product added",
                    data:{newCart}
                })
        } else {
            res.status(400).json({status:"error", msg: "asegurese de rellenar todos los campos", data:{} })
        }
    }
})

cartRouter.get("/:cid", (req, res) => {
    const cid = parseInt(req.params.cid)
    const c = new Cart()
    const cartFind = c.getCartById(cid)
    if(cartFind){
        return res.status(200).json({status:"success",
            msg: "product finded",
            data:{cartFind}
        })
    } else{
        return res.status(400).json({status:"error",
        msg: "Not found",
        data:{}
    })
    }
})

cartRouter.post("/:cid/products/:pid", (req, res) => {
    const cid =parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const pQuantity = req.body
    const c = new Cart()
    const addProductToCart = c.addProductToCart(cid, pid, pQuantity)
    if(addProductToCart){
        return res.status(200).json({status:"success",
            msg: "product added to the cart",
            data:{pQuantity}
        })
    } else{
        return res.status(400).json({status:"error",
            msg: "can´t added the product to the cart",
            data:{}
        })
    }
})
