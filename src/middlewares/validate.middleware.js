module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Données invalides',
      errors: error.details.map((d) => d.message),
    });
  }
  req.body = value;
  next();
};