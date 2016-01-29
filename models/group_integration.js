var bookshelf = require("../lib/bookshelf");

require("./group");
var GroupIntegration = bookshelf.Model.extend({
  tableName: "group_integrations",

  group: function() {
    return this.hasOne("group");
  }

});

module.exports = bookshelf.model("GroupIntegration", GroupIntegration);
