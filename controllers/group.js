var Groups = require("../collections/groups"),
    Group = require("../models/group");

var Controller = {};

Controller.getAll = function (req, res) {
  Groups.forge()
  .fetch({withRelated: ["subscriptions", "digests"]})
  .then(function (model) {
    res.status(200).json(model.toJSON());
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).json(err);
  });
};

Controller.getOne = function (req, res) {
  Groups.forge()
  .query(function (qb) {
    return qb.where("id", "=", req.params.id)
  })
  .fetchOne({withRelated: ["subscriptions", "digests"]})
  .then(function (model) {
    res.status(200).json(model.toJSON());
  })
  .catch(function (err) {
    res.status(500).json(err);
  });
};


module.exports = Controller;
