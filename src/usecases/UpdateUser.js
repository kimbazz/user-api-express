import User from "../domain/entities/User.js";

export class UpdateUser {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  /** @returns {Promise<User>} */
  async execute(userEntity) {
    return this.userRepo.update(userEntity);
  }
}
