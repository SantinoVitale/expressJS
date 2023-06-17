const addProduct = (productId) => {
    Swal.fire({
        title: "Agregar producto a un carrito",
        text: "Ingresa el Id del carrito para agregarlo",
        input: "text",
        confirmButtonText: "Agregar al cartito",
        showCancelButton: true,
        inputValidator: (value) => {
        if (value) {
            fetch(`/api/carts/${value}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({"quantity":1})
            })
            .then(response => {
                console.log("Se hizo: ", response);
            })
            .catch(error => {
                console.log("ERROR: ", error);
            });
        } else {
            console.log("ERROR");
        }
    }
})
}
