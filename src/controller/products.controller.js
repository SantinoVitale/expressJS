import { apiUrl } from "../app.js";
import customError from "../errors/custom-error.js";
import EErros from "../errors/enum.js"
import {productsService} from "../service/products.service.js"
import { sendMailTransport } from "../utils/mailTransport.js";

class ProductsController{
    async get(req, res){
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try{
            let limit = +(req.query.limit)
            let page = +(req.query.page)
            let query = req.query.query
            let sort = req.query.sort
            const products = await productsService.get(limit, page, query, sort)
            res.send({result: "success", payload: products.docs, totalPages: products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, page: products.page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, prevLink: products.prevLink, nextLink: products.nextLink})
        } catch(error){
            req.logger.error(`ERROR: ${error}`);
        }
    }

    async post(req, res){
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        let {title, description, price, code, thumbail, stock, category} = req.body
        const result = await productsService.post(title, description, price, code, thumbail, stock, category, req.user.role, req.user.email)
        if(!result) {
            req.logger.error(`No se pudo agregar el producto, revisar porfavor los datos`);
            return customError.createError({
            name: "Incomplete values",
            cause: "There are missing values to post the product",
            message: "Pls provide a correct info to post product",
            code: EErros.PRODUCT_MANAGER_ERROR
        })
        }
        return res.render("success", {status:"success", message: "Producto agregado correctamente!", payload:{result}, redirect:"products-manager"})
    }

    async put(req, res){
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        let {pid} = req.params
        let productToReplace = req.body
        const result = await productsService.put(pid, productToReplace)
        if(!result){
            req.logger.error(`No se pudo actualizar el producto con el ID: ${pid}, revisar porfavor los datos`);
            return customError.createError({
            name: "Can´t update the product",
            cause: "There are missing or incomplete values to update the product",
            message: "Pls provide correct values to update the product",
            code: EErros.PRODUCT_MANAGER_ERROR
        })
        } 
        return res.render("success", {status:"success", message: "Producto actualizado correctamente!", payload:{result}, redirect:"products-manager"})
    }

    async delete(req, res){
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        let {pid} = req.body
        
        const findOwner = await productsService.getById(pid)
        console.log(findOwner);
        if(findOwner.owner !== "admin"){
            const sendMail = sendMailTransport.sendMail({
                from: process.env.GOOGLE_MAIL,
                to: findOwner.owner,
                subject: "Se ha eliminado su producto de la página",
                html:`
                    <div>
                        <h1>Un admin ha borrado su producto de la página ecommerce</h1>
                        <p>Entre al siguiente <a href="${apiUrl}/" >Link</a> para revisar que producto se borró</p>
                    </div>
                `     
            })
            req.logger.debug("Mail mandado a: " + findOwner.owner)
        }
        const result = await productsService.delete(pid)
        if(!result){
            req.logger.error(`No se pudo borrar el producto con el ID: ${pid}, revisar porfavor los datos`);
            return customError.createError({
            name: "Can´t delete product",
            cause: "Incorrect product id",
            message: "Pls provide a correct product id",
            code: EErros.PRODUCT_MANAGER_ERROR
        })
        } 
        return res.render("success", {status:"success", message: "Producto eliminado correctamente!", payload:{result}, redirect:"products-manager"})
    }
}

export const productsController = new ProductsController()