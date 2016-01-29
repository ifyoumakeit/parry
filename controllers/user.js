var Users = require("../collections/users"),
    User = require("../models/user"),
    _ = require("lodash");

var Controller = {};

Controller.getUsers = function (req, res) {
  Users.forge()
    .fetch()
    .then(function (model) {
      res.status(200).json(model.toJSON());
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};

Controller.getUser = function (req, res) {
  Users.forge()
    .query(function (qb) {
      return qb.where("id", "=", req.params.id)
    })
    .fetchOne({withRelated: ["posts.link"]})
    .then(function (model) {
      res.status(200).json(model.toJSON());
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });
};

Controller.saveUser = function (req, res) {

  User.forge(req.body)
    .save()
    .then(function (model) {
      res.status(200).json(model.toJSON());
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });
};

Controller.updateUser = function (req, res) {
  Users.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.save({
        name: req.body.name || user.get('name'),
        email: req.body.email || user.get('email')
      })
      .then(function () {
        res.json({error: false, data: {message: 'User details updated'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({error: true, data: {message: err.message}});
    });
};

Controller.deleteUser = function (req, res) {
  User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'User successfully deleted'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
}

module.exports = Controller;
