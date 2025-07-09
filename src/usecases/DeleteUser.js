export class DeleteUser {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  /** @returns {Promise<User>} */
  async execute(id) {
    return this.userRepo.delete(id);
  }
}
