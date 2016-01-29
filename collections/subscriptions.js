var bookshelf = require("../lib/bookshelf");

var Subscriptions = bookshelf.Collection.extend({
  model: require("../models/subscription")
});

module.exports = bookshelf.collection("Subscriptions", Subscriptions);
