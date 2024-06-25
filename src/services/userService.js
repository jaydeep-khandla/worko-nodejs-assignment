const userDAO = require("../dao/userDAO");
const UserDTO = require("../dtos/userDTO");

class UserService {
  async createUser(data) {
    const userDTO = new UserDTO(data);
    return await userDAO.create(userDTO);
  }

  async getAllUsers() {
    return await userDAO.findAll();
  }

  async getUserById(id) {
    return await userDAO.findById(id);
  }

  async updateUser(id, data) {
    return await userDAO.update(id, data);
  }

  async deleteUser(id) {
    return await userDAO.softDelete(id);
  }
}

module.exports = new UserService();
