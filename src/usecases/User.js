import jwt from "jsonwebtoken";
import User from "../domain/entities/User.js";
import { hashPassword, comparePassword } from "../utils/security.js";
import { JWT_SECRET_KEY } from "../config/index.js";

export default class UserCase {
  /** @param {{ userRepo: IUserRepository }} dependencies */
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  /**
   * @param {{ name:string, email:string, password:string }} dto
   * @returns {Promise<User>}
   */
  async create(dto) {
    // check unique email
    if (await this.userRepo.findByEmail(dto.email)) {
      throw new Error("Email already in use");
    }

    const user = new User({
      name: dto.name,
      email: dto.email,
      passwordHash: await hashPassword(dto.password),
      createdAt: new Date(),
    });

    return this.userRepo.create(user);
  }

  /**
   * @param {{ email:string, password:string }}
   * @returns {{token: string, isError: boolean, message: string}}
   */
  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      return { token: "", isError: true, message: "Invalid email or password" };
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return { token: "", isError: true, message: "Invalid email or password" };
    }

    // Generate JWT
    const secretKey = JWT_SECRET_KEY;
    if (!secretKey) throw new Error("JWT secret not set");

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      secretKey,
      { expiresIn: "1h" }
    );

    return { token, isError: false, message: "OK" };
  }

  /** @returns {Promise<User[]>} */
  async findAll() {
    return this.userRepo.findAll();
  }

  /** @returns {Promise<User>} */
  async findByID(id) {
    return this.userRepo.findById(id);
  }

  /** @returns {Promise<User>} */
  async update(userEntity) {
    return this.userRepo.update(userEntity);
  }

  /** @returns {Promise<User>} */
  async delete(id) {
    return this.userRepo.delete(id);
  }
}
