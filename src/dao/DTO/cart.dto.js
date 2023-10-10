export default class CartDTO {
  constructor(cart) {
    this.products = cart.products.map((product) => {
      return {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock
      }
    })
    this.quantity = cart.quantity
    this.user = cart.users
  }
}