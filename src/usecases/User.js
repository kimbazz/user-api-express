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
   * @returns {{user: Promise<User>, isError: boolean, message: string}}
   */
  async create(dto) {
    // check unique email
    if (await this.userRepo.findByEmail(dto.email)) {
      return { user: null, isError: true, message: "Email already in use" };
    }

    try {
      const userToInsert = new User({
        name: dto.name,
        email: dto.email,
        passwordHash: await hashPassword(dto.password),
        createdAt: new Date(),
      });

      const user = await this.userRepo.create(userToInsert);
      if (!user) {
        return {
          user: null,
          isError: true,
          message:
            "Something went wrong when try to create user data, please check the properties",
        };
      }

      return { user, isError: false, message: "OK" };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @param {{ email:string, password:string }}
   * @returns {{token: string, isError: boolean, message: string}}
   */
  async login(email, password) {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        return {
          token: "",
          isError: true,
          message: "Invalid email or password",
        };
      }

      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        return {
          token: "",
          isError: true,
          message: "Invalid email or password",
        };
      }

      // Generate JWT
      const secretKey = JWT_SECRET_KEY;
      if (!secretKey) throw new Error("JWT secret not set");

      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

      return { token, isError: false, message: "OK" };
    } catch (err) {
      throw new Error(err);
    }
  }

  /** @returns {{users: Promise<User[]>, isError: boolean, message: string}} */
  async findAll() {
    try {
      const users = await this.userRepo.findAll();
      if (!users) {
        return {
          users: null,
          isError: false,
          message: "No user data exist in database",
        };
      }

      return { users, isError: false, message: "OK" };
    } catch (err) {
      throw new Error(err);
    }
  }

  /** @returns {{user: Promise<User>, isError: boolean, message: string}} */
  async findByID(id) {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) {
        return {
          user: null,
          isError: true,
          message: `User with id: ${id} not found`,
        };
      }

      return { user, isError: false, message: "OK" };
    } catch (err) {
      throw new Error(err);
    }
  }

  /** @returns {{user: Promise<User>, isError: boolean, message: string}} */
  async update(userEntity) {
    const { id } = userEntity;
    try {
      const user = await this.userRepo.update(userEntity);
      if (!user) {
        return {
          user: null,
          isError: true,
          message: `Failed to update user, id: ${id} not found`,
        };
      }

      return { user, isError: false, message: "OK" };
    } catch (err) {
      throw new Error(err);
    }
  }

  /** @returns {Promise<User>} */
  async delete(id) {
    try {
      const user = await this.userRepo.delete(id);
      console.log(user);
      if (!user) {
      return {
          user: null,
          isError: true,
          message: `User with id: ${id} not found, failed to delete data`,
        };
      } else {
        return { user, isError: false, message: "OK" };
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
