module.exports = function(req, res, next) {
  res.contentType = "json";
  res.send({ message: "hello K8s" });
  next();
};
