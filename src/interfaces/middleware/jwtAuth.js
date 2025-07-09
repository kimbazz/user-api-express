import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config/index.js";
import { getBearerToken } from "../../utils/security.js";

const jwtAuth = (req, res, next) => {
  const token = getBearerToken(req.headers.authorization);

  if (token) {
    try {
      const secret = JWT_SECRET_KEY;

      if (!secret) throw new Error("JWT secret not set");

      const decoded = jwt.verify(token, secret);

      req.user = decoded;

      return next();
    } catch (err) {
      err.status = 401;
      return next(err);
    }
  } else {
    req.authToken = null;
    const err = new Error(
      "No token found, you are not authorized to make this request!"
    );
    err.status = 401;
    return next(err);
  }
};

export default jwtAuth;
