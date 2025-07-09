import IUserRepository from "../../domain/repositories/IUserRepository.js";
import UserModel from "../models/user.model.js";

export default class UserRepositoryImpl extends IUserRepository {
  async create(userEntity) {
    const created = await UserModel.create(userEntity);
    return created.toObject();
  }

  async delete(id) {
    return UserModel.findByIdAndDelete(id);
  }

  async findAll() {
    return UserModel.find({})
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(id) {
    return UserModel.findById(id).select("name email createdAt").lean();
  }

  async findByEmail(email) {
    return UserModel.where({ email: email }).findOne().lean();
  }

  async update(userEntity) {
    const { id, ...rest } = userEntity;
    return UserModel.findByIdAndUpdate(id, rest, { new: true }).lean();
  }
}
