import UserRepoImpl from "../../../infrastructure/repositories/UserRepositoryImpl.js";
import UserCase from "../../../usecases/User.js";

const userRepo = new UserRepoImpl();
const userUC = new UserCase({ userRepo });

export default {
  async create(req, res, next) {
    try {
      const resp = await userUC.create(req.body);

      const { isError } = resp;

      if (isError) {
        return res.status(400).json(resp);
      }

      res.status(201).json(resp);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const resp = await userUC.findAll();

      const { isError } = resp;

      if (isError) {
        return res.status(404).json(resp);
      }

      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await userUC.findByID(id);

      const { isError } = resp;

      if (isError) {
        return res.status(404).json(resp);
      }

      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    const { body, params } = req;
    const { id } = params;
    try {
      const resp = await userUC.update({
        id,
        ...body,
      });

      const { isError } = resp;

      if (isError) {
        return res.status(404).json(resp);
      }

      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await userUC.delete(id);

      const { isError } = resp;

      if (isError) {
        return res.status(404).send(resp);
      }

      res.status(204).send(resp);
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
