var bookshelf,
    settings = {
      debug: true,
      client: "pg",
      connection: process.env.DATABASE_URL || "",
      ssl: Boolean(process.env.DATABASE_URL)
    };

bookshelf = require("bookshelf")(require("knex")(settings));
bookshelf.plugin("visibility");
bookshelf.plugin("registry");

module.exports = bookshelf;
