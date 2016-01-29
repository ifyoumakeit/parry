var bookshelf = require("../lib/bookshelf");

require("./group"),
require("./user");

var Subscription = bookshelf.Model.extend({
  tableName: "subscriptions",
  hasTimestamps: true,

  group: function() {
    return this.belongsTo("Group");
  },
  user: function() {
    return this.belongsTo("User");
  }
});

module.exports = bookshelf.model("Subscription", Subscription);
