var bookshelf = require("../lib/bookshelf");

var UserIntegrations = bookshelf.Collection.extend({
  model: require("../models/user_integration")
});

module.exports = bookshelf.collection("UserIntegrations", UserIntegrations);
