var Subscriptions = require("../collections/subscriptions");

var Controller = {};

Controller.getAll = function (req, res) {
  Subscriptions.forge()
  .fetch()
  .then(function (model) {
    res.status(200).json(model.toJSON());
  })
  .catch(function (err) {
    res.status(500).json(err);
  });
};

Controller.getOne = function (req, res) {
  Subscriptions.forge()
  .query(function (qb) {
    return qb.where("id", "=", req.params.id)
  })
  .fetchOne()
  .then(function (model) {
    res.status(200).json(model.toJSON());
  })
  .catch(function (err) {
    res.status(500).json(err);
  });
};

module.exports = Controller;
