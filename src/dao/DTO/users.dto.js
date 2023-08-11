export default class UsersDTO {
  constructor(user) {
    this.first_name = user.firstName;
    this.last_name = user.lastName;
    this.email = user.email
  }
}