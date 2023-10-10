export default class ProductDTO {
  constructor(p) {
    this.products = p.docs.map((p) => {
      return {
        _id: p._id.toString(),
        title: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock,
        owner: p.owner
      }})
    this.pagination = {
      totalDocs: p.totalDocs,
      limit: p.limit,
      totalPages: p.totalPages,
      page: p.page,
      pagingCounter: p.pagingCounter,
      hasPrevPage: p.hasPrevPage,
      hasNextPage: p.hasNextPage,
      prevPage: p.prevPage,
      nextPage: p.nextPage
    }
  }
}