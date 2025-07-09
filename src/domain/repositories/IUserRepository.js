export default class IUserRepository {
  /** @param {User} userEntity */
  async create(userEntity) {
    throw new Error("Not implemented");
  }

  /** @returns {Promise<User[]>} */
  async findAll() {
    throw new Error("Not implemented");
  }

  /** @param {string} id */
  async findById(id) {
    throw new Error("Not implemented");
  }

  /** @param {string} email */
  async findByEmail(email) {
    throw new Error("Not implemented");
  }

  /** @param {User} userEntity */
  async update(userEntity) {
    throw new Error("Not implemented");
  }

  /** @param {string} id */
  async delete(id) {
    throw new Error("Not implemented");
  }
}
