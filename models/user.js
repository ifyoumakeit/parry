var bookshelf = require("../lib/bookshelf");

require("./group"),
require("./post"),
require("./subscription"),
require("./user_integration");

var User = bookshelf.Model.extend({
  tableName: "users",
  hasTimestamps: true,
  visible: [
    "name",
    "email",
    "id",
    "groups",
    "subscriptions",
    "posts"
  ],

  posts: function() {
    return this.hasMany("Post");
  },
  subscriptions: function() {
    return this.belongsToMany("Subscription");
  },
  groups: function() {
    return this.belongsToMany("Group");
  },
  integrations: function() {
    return this.hasMany("UserIntegration");
  }

});

module.exports = bookshelf.model("User", User);
