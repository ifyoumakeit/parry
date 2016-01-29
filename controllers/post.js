var Posts = require("../collections/posts"),
    Post = require("../models/post");

var Controller = {};

Controller.getAll = function (req, res) {
  Posts.forge()
  .fetch({withRelated: ["digest","user"]})
  .then(function (model) {
    res.status(200).json(model.toJSON());
  })
  .catch(function (err) {
    res.status(500).json(err);
  });
};

Controller.getOne = function (req, res) {
  Posts.forge()
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
