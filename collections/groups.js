var bookshelf = require("../lib/bookshelf");

var Groups = bookshelf.Collection.extend({
  model: require("../models/group")
});

module.exports = bookshelf.collection("Groups", Groups);
