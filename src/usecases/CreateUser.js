import User from "../domain/entities/User.js";

export default class CreateUser {
  /** @param {{ userRepo: IUserRepository, passwordHasher: func   }} dependencies */
  constructor({ userRepo, passwordHasher }) {
    this.userRepo = userRepo;
    this.passwordHasher = passwordHasher;
  }

  /**
   * @param {{ name:string, email:string, password:string }} dto
   * @returns {Promise<User>}
   */
  async execute(dto) {
    // check unique email
    if (await this.userRepo.findByEmail(dto.email)) {
      throw new Error("Email already in use");
    }

    const user = new User({
      name: dto.name,
      email: dto.email,
      passwordHash: await this.passwordHasher(dto.password),
      createdAt: new Date(),
    });

    return this.userRepo.create(user);
  }
}
