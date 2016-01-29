var bookshelf = require("../lib/bookshelf");

var Users = bookshelf.Collection.extend({
  model: require("../models/user")
});

module.exports = bookshelf.collection("Users", Users);
