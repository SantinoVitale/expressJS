import express from "express";
import { ProductManager } from "../utils/utils.js";


const app = express()
export const productsRouter = express.Router()



productsRouter.get("/", (req, res) => {
    
    const limitParsed = parseInt(req.query.limit)
    const pm = new ProductManager()
    const products = pm.getProducts()
    if(!limitParsed){
        return res.json({status:"success", msg: "no limit filtred", data:{products}})
    } else{
        let filterProducts = products.slice(0, limitParsed)
        return res.json({status:"success", msg: "limit filtred", data:{filterProducts}})
    }
    
})

productsRouter.get("/:pid", (req, res) => {
    
    const pid = parseInt(req.params.pid)
    const pm = new ProductManager()
    const productFind = pm.getProductById(pid)
    if(productFind){
        return res.status(200).json({status:"success",
            msg: "product finded",
            data:{productFind}
        })
    } else{
        return res.status(400).json({status:"error",
        msg: "Not found",
        data:{}
    })
    }
    
})

productsRouter.post("/", (req, res) => {
    const productBody = req.body
    if(productBody.id){
        res.status(400).json({status:"error",
                msg: "do not post an id",
                data:{}
            })
    }else {
        productBody.id = +(Math.random() * 100000).toFixed(0);
        const pm = new ProductManager()
        const newProduct = pm.addProduct(productBody)
        if(newProduct){
            res.status(201).json({status:"success",
                    msg: "product added",
                    data:{productBody}
                })
        } else {
            res.status(400).json({status:"error", msg: "asegurese de rellenar todos los campos", data:{} })
        }
    }
})

productsRouter.put("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    const productBody = req.body
    if(!productBody.id){
        const pm = new ProductManager()
        const putProduct = pm.updateProduct(pid, productBody)
        if(putProduct !== false){
            res.status(200).json({status:"success",
            msg: "product updated",
            data:{putProduct}
            })
        } else {
            res.status(400).json({status:"error",
            msg: "error",
            data:{}
            })
        }
        
    } else {
        res.status(400).json({status:"error",
            msg: "do not pass id",
            data:{}
        })
    }
    

})

productsRouter.delete("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    const pm = new ProductManager()
    pm.deleteProduct(pid)
    if(pm){
        res.status(200).json({status:"success",
            msg: "product deleted",
            data:{pid}
        })
    } else {
        res.status(400).json({status:"error",
            msg: "error trying to delete the product",
            data:{}
        })
    }
})