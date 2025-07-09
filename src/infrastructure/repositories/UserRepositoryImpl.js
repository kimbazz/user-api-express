import IUserRepository from "../../domain/repositories/IUserRepository.js";
import UserModel from "../models/user.model.js";

export default class UserRepositoryImpl extends IUserRepository {
  async create(userEntity) {
    const created = await UserModel.create(userEntity);
    return created.toObject();
  }

  async findAll() {
    return UserModel.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id) {
    return UserModel.findById(id).lean();
  }

  async findByEmail(email) {
    return UserModel.where({ email: email }).findOne().lean();
  }

  async update(userEntity) {
    const { id, ...rest } = userEntity;
    return UserModel.findByIdAndUpdate(id, rest, { new: true }).lean();
  }

  async delete(id) {
    await UserModel.findByIdAndDelete(id);
  }
}
