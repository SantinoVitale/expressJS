const express = require("express")

const app = express()

const products = [
    {name: "producto1", description: "description1", price: 200, thumbail:"Sin imagen", code: "abc123", stock: 12, id: 1},
    {name: "producto2", description: "description2", price: 210, thumbail:"Sin imagen", code: "abc124", stock: 10, id: 2},
    {name: "producto3", description: "description3", price: 300, thumbail:"Sin imagen", code: "abc125", stock: 25, id: 3},
    {name: "producto4", description: "description4", price: 100, thumbail:"Sin imagen", code: "abc126", stock: 20, id: 4},
    {name: "producto5", description: "description5", price: 250, thumbail:"Sin imagen", code: "abc127", stock: 5, id: 5},
    {name: "producto6", description: "description6", price: 150, thumbail:"Sin imagen", code: "abc128", stock: 1, id: 6},
    {name: "producto7", description: "description7", price: 500, thumbail:"Sin imagen", code: "abc129", stock: 4, id: 7},
    {name: "producto8", description: "description8", price: 50, thumbail:"Sin imagen", code: "abc130", stock: 32, id: 8},
    {name: "producto9", description: "description9", price: 267, thumbail:"Sin imagen", code: "abc131", stock: 15, id: 9},
    {name: "producto10", description: "description10", price: 220, thumbail:"Sin imagen", code: "abc132", stock: 12, id: 10}
]

app.get("/products", (req, res) => {
    
    const limitParsed = parseInt(req.query.limit)
    if(!limitParsed){
        return res.json({status:"success", msg: "no limit filtred", data:{products}})
    } else{
        let filterProducts = products.slice(0, limitParsed)
        return res.json({status:"success", msg: "limit filtred", data:{filterProducts}})
    }
    
})

app.get("/products/:pid", (req, res) => {
    
    const pid = parseInt(req.params.pid)
    const productFind = products.find((p) => p.id == pid)
    if(!productFind == ""){
        return res.json({status:"success",
            msg: "product finded",
            data:{productFind}
        })
    } else{
        return res.json({status:"error",
        msg: "Not found",
        data:{}
    })
    }
    
})

app.listen(8080, () => {
    console.log("Server escuchando en el puerto 8080")
})