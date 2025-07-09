import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config/index.js";

const jwtAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const secret = JWT_SECRET_KEY;

      if (!secret) throw new Error("JWT secret not set");

      const decoded = jwt.verify(token, secret);

      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    req.authToken = null;
    return res.status(401).send({
      message: "No token found, you are not authorized to make this request!",
    });
  }
};

export default jwtAuth;
