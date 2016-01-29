var bookshelf = require("../lib/bookshelf");

var Digests = bookshelf.Collection.extend({
  model: require("../models/digest")
});

module.exports = bookshelf.collection("Digests", Digests);
