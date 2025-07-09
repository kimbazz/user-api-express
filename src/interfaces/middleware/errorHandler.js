const errorHandler = (err, req, res, next) => {
  const { status = 500, stack, message = null } = err;

  console.error(stack);

  res.status(status).json({ message: message || "Internal Server Error" });
};

export default errorHandler;
