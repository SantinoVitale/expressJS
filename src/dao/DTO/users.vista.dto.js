export default class UsersVistaDTO {
  constructor(user) {
    this.users = user.docs.map((u) => {
      return{
        id: u._id.toString(),
        first_name: u.firstName,
        last_name: u.lastName,
        email: u.email,
        role: u.role,
        carts: u.carts      
      }
    })
    this.pagination = {
      totalDocs: user.totalDocs,
      limit: user.limit,
      totalPages: user.totalPages,
      page: user.page,
      pagingCounter: user.pagingCounter,
      hasPrevPage: user.hasPrevPage,
      hasNextPage: user.hasNextPage,
      prevPage: user.prevPage,
      nextPage: user.nextPage
    }
    
  }
}