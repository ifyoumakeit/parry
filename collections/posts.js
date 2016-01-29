var bookshelf = require("../lib/bookshelf");

var Posts = bookshelf.Collection.extend({
  model: require("../models/post")
});

module.exports = bookshelf.collection("Posts", Posts);
