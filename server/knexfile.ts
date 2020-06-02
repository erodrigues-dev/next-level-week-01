const path = require("path");

module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src/database", "database.sqlite"),
  },
  migrations: {
    extension: "ts",
    directory: path.resolve(__dirname, "src/database/migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src/database/seeds"),
  },
  useNullAsDefault: true,
};
