export default {
  async create(req, res, next) {
    try {
      res.status(201).json(req.body);
    } catch (err) {
      next(err);
    }
  },
  async getAll(req, res, next) {
    try {
      res.status(200).json(req.body);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      res.status(200).json(req.body);
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      res.status(200).json(req.body);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    try {   
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};