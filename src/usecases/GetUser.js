export class GetAllUsers {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  /** @returns {Promise<User[]>} */
  async execute() {
    return this.userRepo.findAll();
  }
}

export class GetByID {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  /** @returns {Promise<User>} */
  async execute(id) {
    return this.userRepo.findById(id);
  }
}
