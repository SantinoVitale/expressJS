import {productsService} from "../service/products.service.js"

class ProductsController{
    async get(req, res){
        try{
            let limit = +(req.query.limit)
            let page = +(req.query.page)
            let query = req.query.query
            let sort = req.query.sort
            const products = await productsService.getAll(limit, page, query, sort)
            res.send({result: "success", payload: products.docs, totalPages: products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, page: products.page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, prevLink: products.prevLink, nextLink: products.nextLink})
          } catch(error){
            console.log("Hubo un error", error);
          }
    }

    async post(req, res){
        let {title, description, price, code, thumbail, stock, category} = req.body
        const result = await productsService.post(title, description, price, code, thumbail, stock, category)
        if(!result) return res.status(400).json({status: "error", msg: "incomplete values", data: {}})
        return res.status(200).json({
            status:"success",
            msg: "product added",
            data:{result}
        })
    }

    async put(req, res){
        let {pid} = req.params
        let productToReplace = req.body
        const result = await productsService.post(pid, productToReplace)
        if(!result) return res.status(400).json({status:"error", msg: "incomplete values", data:{} })
        return 
    }

    async delete(req, res){
        let {pid} = req.params
        const result = await productsService.delete(pid)
        return res.status(200).json({
            status:"success",
            msg: "product deleted",
            data:{result}
        })
    }
}

export const productsController = new ProductsController()