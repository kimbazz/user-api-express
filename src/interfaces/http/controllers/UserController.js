import UserRepoImpl from "../../../infrastructure/repositories/UserRepositoryImpl.js";
import UserCase from "../../../usecases/User.js";

const userRepo = new UserRepoImpl();
const userUC = new UserCase({ userRepo });

export default {
  async create(req, res, next) {
    try {
      const created = await userUC.create(req.body);

      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const users = await userUC.findAll();

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await userUC.findByID(id);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    const { body, params } = req;
    const { id } = params;
    try {
      const updated = await userUC.update({
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
      const deleted = await userUC.delete(id);

      res.status(204).send(deleted);
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { token, isError, message } = await userUC.login(email, password);
      if (isError) {
        return res.status(401).json({ message });
      }

      res.status(200).json({ token, isError, message });
    } catch (err) {
      next(err);
    }
  },
};
