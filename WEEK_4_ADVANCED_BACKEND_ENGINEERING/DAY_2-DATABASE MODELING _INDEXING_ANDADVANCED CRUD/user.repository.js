const BaseRepository = require('./base.repository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findByEmail(email);
  }

  async findByUsername(username) {
    return await this.model.findByUsername(username);
  }

  async findByEmailWithPassword(email) {
    return await this.model.findOne({ email }).select('+password');
  }

  async findActive() {
    return await this.model.findActive();
  }

  async findByRole(role) {
    return await this.model.findByRole(role);
  }

  async updateLastLogin(userId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { lastLoginAt: new Date() },
      { new: true }
    );
  }

  async softDelete(userId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { deletedAt: new Date() },
      { new: true }
    );
  }

  async restore(userId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { deletedAt: null },
      { new: true }
    );
  }
}

module.exports = new UserRepository();
// User repository: CRUD operations with advanced query support and pagination
