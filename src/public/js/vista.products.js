const addProduct = async (productId) => {

    const { value: formValues } = await Swal.fire({
        title: 'Ingrese ID del carrito y la cantidad para agregarlos',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Ingrese ID del carrito">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Ingrese cantidad de productos">',
        focusConfirm: false,
        preConfirm: () => {
        return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
        ]
        }
    })

    if (formValues) {
        const cartId = formValues[0]
        const quantity = formValues[1]
        fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"quantity":quantity})
        })
        .then(response => {
            console.log("Se hizo: ", response);
        })
        .catch(error => {
            console.log("ERROR: ", error);
        });
    } else{
        console.log("ERROR");
    }

    /*Swal.fire({
        title: "Agregar producto a un carrito",
        text: "Ingresa el Id del carrito y la cantidad de productos para agregarlo",
        html:
            '<input id="cart-input" class="swal2-input" placeholder="ID del carrito">' +
            '<input id="quantity-input" class="swal2-input" placeholder="Cantidad del producto">',
        confirmButtonText: "Agregar al cartito",
        showCancelButton: true,
        inputValidator: (value) => {
            const cartId = document.getElementById('cart-input').value
            const quantity = document.getElementById('quantity-input').value
            console.log(value);
            console.log(cartId, quantity);
        if (value) {
            fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({"quantity":quantity})
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
})*/
}
