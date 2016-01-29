var bookshelf = require("../lib/bookshelf");

require("./user");
var UserIntegration = bookshelf.Model.extend({
  tableName: "user_integrations",

  user: function() {
    return this.hasOne("user");
  }

});

module.exports = bookshelf.model("UserIntegration", UserIntegration);
