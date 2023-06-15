import { json } from "express";
import * as fs from "fs";

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

/*export class ProductManager {

    #products = []
    #path
    #id 

    constructor(){
        this.#path = "./src/data/products.json";
        if(fs.existsSync(this.#path)){
            const file = fs.readFileSync(this.#path, "utf-8")
            const data = JSON.parse(file)

            this.#products = data
        } else {
            const data = JSON.stringify([])
            fs.writeFileSync(this.#path, data, () => {
                this.#products = []
            })
        }
    }
        #saveData = () => {
            const data = JSON.stringify(this.#products)
            fs.writeFileSync(this.#path, data, (err)=> {
                if(err) throw new Error(err)
                return "success"
            })
        }
    
    addProduct = (product) => {
        if(!product.title) return false
        if(!product.description) return false
        if(!product.code) return false
        if(!product.price && +(product.price) !== NaN)return false
        if(!product.status ) product.status = true;
        if(!product.stock && +(product.stock) !== NaN) return false
        if(!product.category) return false
        const productFind = this.#products.find((p) => p.id == product.id)
        if(productFind == undefined){
            this.#products.push(product)
            this.#saveData()
            return true
            
        } else{
            return false
        }
        
    }

    updateProduct = (id, update) => {
        let products = this.#products
        
        const foundId = products.find(e => e.id === id) // * Find the product with the specified id
        if(foundId){
            Object.assign(foundId, update);
            this.#products = products
            this.#saveData()
            return true
        } else {
            return false // * If the product isn't found, print an error message
        }

        
    }

    deleteProduct = (id) => {
        let products = this.#products
        const validator = products.find(e => e.id === id)
        const foundId = products.filter(product => product.id !== id);
        if(validator){
            this.#products = foundId
            this.#saveData()
            return true
        } else {
            return false
        }
    }

    getProducts = () => {
        return this.#products
    }

    getProductById = (id) => {
        const product =  this.#products.find(prod => prod.id === id)
        if(!product){
            return false
        }

        return product
    }

}*/

/*export class Cart{
    #cart = []
    #path
    #id 

    constructor(){
        this.#path = "./src/data/cart.json";
        if(fs.existsSync(this.#path)){
            const file = fs.readFileSync(this.#path, "utf-8")
            const data = JSON.parse(file)

            this.#cart = data
        } else {
            const data = JSON.stringify([])
            fs.writeFileSync(this.#path, data, () => {
                this.#cart = []
            })
        }
    }
        #saveData = () => {
            const data = JSON.stringify(this.#cart)
            fs.writeFileSync(this.#path, data, (err)=> {
                if(err) throw new Error(err)
                return "success"
            })
        }

    createCart = (cart) => {
        if(!cart.products && cart.products == []) return false
        const cartId = this.#cart.find((p) => p.id == cart.id)
        if(cartId == undefined){
            this.#cart.push({
                id: cart.id,
                products: []
            })
            this.#saveData()
            return true
            
        } else{
            return false
        }
    }

    getCartById = (id) => {
        const cart =  this.#cart.find(cart => cart.id === id)
        if(!cart){
            return false
        }

        return cart
    }

    addProductToCart = (cid, pid, q) => {
        
        const cart =  this.#cart.find((cart) => cart.id === cid);
        const products = "./src/data/products.json";
        if(fs.existsSync(products)){
            const file = fs.readFileSync(products, "utf-8");
            const data = JSON.parse(file);
            const pidFind = data.find(p => p.id === pid);
            const cartProducts = cart.products;
            const cartProductsFind = cartProducts.find(p => p.id === pid);
            if(cartProductsFind !== undefined){
                cartProductsFind.quantity += q.quantity
                cart.products = cartProducts
                this.#saveData()
                return true
            } else{
                const newOrder = {
                id: pidFind.id,
                quantity: q.quantity
                }
                cartProducts.push(newOrder)
                cart.products = cartProducts
                this.#saveData()
                return true
            }
            
        }else {
            return false
        }
    }
}*/