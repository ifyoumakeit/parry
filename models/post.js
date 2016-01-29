var bookshelf = require("../lib/bookshelf");

require("./digest"),
require("./group"),
require("./user");

var Post = bookshelf.Model.extend({
  tableName: "posts",
  hasTimestamps: true,
  visible: [
    "id",
    "created_at",
    "url",
    "description",
    "user",
    "digest",
    "group_id"
  ],

  user: function() {
    return this.belongsTo("User");
  },
  digest: function() {
    return this.belongsTo("Digest");
  },
  group: function() {
    return this.belongsTo("Group");
  }
});

module.exports = bookshelf.model("Post", Post);
