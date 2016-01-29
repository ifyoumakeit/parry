var bookshelf = require("../lib/bookshelf");

require("./post");
require("./group");
var Digest = bookshelf.Model.extend({
  tableName: "digests",
  hasTimestamps: true,
  hidden: [
    "group_id"
  ],

  group: function() {
    return this.belongsTo("Group");
  },

  posts: function() {
    return this.hasMany("Post")
  }
});

module.exports = bookshelf.model("Digest", Digest);
