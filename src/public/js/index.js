const socket = io();

const titleBox = document.getElementById("input-title")
const descriptionBox = document.getElementById("input-description")
const priceBox = document.getElementById("input-price")
const codeBox = document.getElementById("input-code")
const thumbailBox = document.getElementById("input-thumbail")
const stockBox = document.getElementById("input-stock")
const categoryBox = document.getElementById("input-category")

const sumbit = document.getElementById("input-submit")
const deleteBtn = document.getElementById("input-delete")


deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Eliminar un producto",
    text: "Ingresa un Id para borrar ese producto",
    input: "number",
    confirmButtonText: "Borrar producto",
    showCancelButton: true,
    inputValidator: (value) => {
    if (!value) {
      return 'You need to write something!'
    } else {
      socket.emit("delete_product_front_to_back", { value })
    }
  }
})
})

sumbit.addEventListener("click", (e) => {
  e.preventDefault()
  socket.emit("product_front_to_back", {
    title: titleBox.value,
    description: descriptionBox.value,
    price: +(priceBox.value),
    code: codeBox.value,
    thumbail: thumbailBox.value, 
    stock: +(stockBox.value),
    category: categoryBox.value,
  });
})

socket.on("get_products", (products) => {

  const divProducts = document.getElementById("div-products");
  let contenido = "";
  products.forEach((products) => {
    contenido = contenido + `
    <p>id: ${products.id}</p>
    <p>title: ${products.title}</p>
    <p>price: ${products.price}</p>
    <p>descripcion: ${products.description}</p>
    <hr/>
    `;
  });
  divProducts.innerHTML = contenido;
  window.scrollTo(0, document.body.scrollHeight);
});
