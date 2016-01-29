var bookshelf = require("../lib/bookshelf");

var GroupIntegrations = bookshelf.Collection.extend({
  model: require("../models/group_integration")
});

module.exports = bookshelf.collection("GroupIntegrations", GroupIntegrations);
