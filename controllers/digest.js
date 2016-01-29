var Digests = require("../collections/digests");

var Controller = {};

Controller.getAll = function (req, res) {
  Digests.forge()
  .fetch({withRelated: ["group", "posts"]})
  .then(function (model) {
    res.status(200).json(model.toJSON());
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).json(err);
  });
};

Controller.getOne = function (req, res) {
  Digests.forge()
  .query(function (qb) {
    return qb.where("id", "=", req.params.id)
  })
  .fetchOne({withRelated: ["group"]})
  .then(function (model) {
    res.status(200).json(model.toJSON());
  })
  .catch(function (err) {
    res.status(500).json(err);
  });
};

module.exports = Controller;
