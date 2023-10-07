export default class UsersDTO {
  constructor(user) {
    this.users = user.map((u) => {
      return {
        id: u._id,
        first_name: u.firstName,
        last_name: u.lastName,
        email: u.email,
        role: u.role,
        last_connection: u.last_connection
      }
    });
    
  }
}