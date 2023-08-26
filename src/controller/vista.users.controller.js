import { usersService } from "../service/users.service.js"

class VistaUsersController{
  async getAll(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    
    const { page, limit } = req.query
    const users = await usersService.getAll(page, limit)
    return res.status(200).render("users", {
      users: users.users,
      pagingCounter: users.pagination.pagingCounter,
      totalPages: users.pagination.totalPages,
      page: users.pagination.page,
      hasPrevPage: users.pagination.hasPrevPage,
      hasNextPage: users.pagination.hasNextPage,
      prevPage: users.pagination.prevPage,
      nextPage: users.pagination.nextPage
    })
  }
}

export const vistaUsersController = new VistaUsersController()