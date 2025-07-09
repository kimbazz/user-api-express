import UserRepoImpl from "../../../infrastructure/repositories/UserRepositoryImpl.js";
import { hashPassword } from "../../../utils/security.js";
import CreateUser from "../../../usecases/CreateUser.js";
import { GetAllUsers, GetByID } from "../../../usecases/GetUser.js";
import { UpdateUser } from "../../../usecases/UpdateUser.js";
import { DeleteUser } from "../../../usecases/DeleteUser.js";

const userRepo = new UserRepoImpl();
const createUserUC = new CreateUser({ userRepo, passwordHasher: hashPassword });
const getAllUsersUC = new GetAllUsers({ userRepo });
const getByIDUC = new GetByID({ userRepo });
const updateUserUC = new UpdateUser({ userRepo });
const deleteUserUC = new DeleteUser({ userRepo });

export default {
  async create(req, res, next) {
    try {
      const created = await createUserUC.execute(req.body);

      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  async getAll(req, res, next) {
    try {
      const users = await getAllUsersUC.execute();

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await getByIDUC.execute(id);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    const { body, params } = req;
    const { id } = params;
    try {
      const updated = await updateUserUC.execute({
        id,
        ...body,
      });

      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deleted = await deleteUserUC.execute(id);

      res.status(204).send(deleted);
    } catch (err) {
      next(err);
    }
  },
};
