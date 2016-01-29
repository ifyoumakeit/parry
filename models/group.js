var bookshelf = require("../lib/bookshelf");

require("./digest");
require("./subscription");
require("./post");
require("./user");
require("./group_integration");
var Group = bookshelf.Model.extend({
  tableName: "groups",
  hasTimestamps: true,

  subscriptions: function() {
    return this.belongsToMany("User").through('Subscription');
  },

  digests: function() {
    return this.hasMany("Digest");
  },

  posts: function() {
    return this.hasMany("Post");
  },

  integrations: function() {
    return this.hasOne("GroupIntegration");
  }
});

module.exports = bookshelf.model("Group", Group);
