export default class UserController {
  /**
   * @param {{ userUC }} deps
   */
  constructor({ userUC }) {
    this.userUC = userUC;
  }

  async create(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const resp = await this.userUC.create({ name, email, password });
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
  }

  async getAll(req, res, next) {
    try {
      const resp = await this.userUC.findAll();
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
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await this.userUC.findByID(id);
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
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await this.userUC.update({ id, ...req.body });
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
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await this.userUC.delete(id);
      const { isError, message } = resp;
      if (isError) {
        const err = new Error(
          message || `Failed to delete user with id: ${id}`
        );
        err.status = 404;
        throw err;
      }
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { token, isError, message } = await this.userUC.login(
        email,
        password
      );
      if (isError) {
        const err = new Error(message || "Invalid email or password");
        err.status = 401;
        throw err;
      }
      res.status(200).json({ token, isError, message });
    } catch (err) {
      next(err);
    }
  }
}
