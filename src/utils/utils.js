import { json } from "express";
import * as fs from "fs";

export class ProductManager {

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
        
        for(let i = 1; i < products.length; i++){
            console.log(i)
            if(products[i].id === id){
                
                products[i] = {
                    ...products[i],
                    ...update
                }
                
            }
        }

        this.#products = products
        return this.#saveData()
    }

    deleteProduct = (id) => {
        let products = this.#products;
        let index = null;
        for(let i = 0; i < products.length; i++){
            if(products[i].id === id){
                index = i
            }
        }

        if(index || index === 0){
            products = products.slice(index, 1);
        } else {
            throw new Error("No se encontró el producto");
        }

        this.#products = products
        return this.#saveData()
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

}
const product1 = {
    id: 1,
    title: "producto1",
    description: "description1",
    code:"12345",
    price: 300,
    status: true,
    stock: 45,
    category: "categoria1"
}

const product2 = {
    id: 2,
    title: "producto2",
    description: "description2",
    code:"12346",
    price: 100,
    status: false,
    stock: 25,
    category: "categoria2"
}

