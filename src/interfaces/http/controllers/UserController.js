import UserRepoImpl from "../../../infrastructure/repositories/UserRepositoryImpl.js";
import UserCase from "../../../usecases/User.js";

const userRepo = new UserRepoImpl();
const userUC = new UserCase({ userRepo });

export default {
  async create(req, res, next) {
    const { body } = req;
    const { name, email, password } = body;

    try {
      const resp = await userUC.create({ name, email, password });

      const { isError, message } = resp;

      if (isError) {
        const err = new Error(message || "Failed to create user");
        err.status = 400;
        throw err;
      }

      res.status(201).json(resp);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const resp = await userUC.findAll();

      const { isError, message } = resp;

      if (isError) {
        const err = new Error(message || "Failed to fetch users");
        err.status = 404;
        throw err;
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

      const { isError, message } = resp;

      if (isError) {
        const err = new Error(message || `User with id: ${id} not found`);
        err.status = 404;
        throw err;
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

      const { isError, message } = resp;

      if (isError) {
        const err = new Error(
          message || `Failed to update user with id: ${id}`
        );
        err.status = 404;
        throw err;
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

      const { isError, message } = resp;

      if (isError) {
        const err = new Error(
          message || `Failed to delete user with id: ${id}`
        );
        err.status = 404;
        throw err;
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
        const err = new Error(message || "Invalid email or password");
        err.status = 401;
        throw err;
      }

      res.status(200).json({ token, isError, message });
    } catch (err) {
      next(err);
    }
  },
};
