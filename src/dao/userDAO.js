const User = require('../models/User');

class UserDAO {
  async create(user) {
    return await User.create(user);
  }

  async findAll() {
    return await User.find({ isDeleted: false });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async softDelete(id) {
    return await User.findByIdAndUpdate(id, { isDeleted: true });
  }
}

module.exports = new UserDAO();
