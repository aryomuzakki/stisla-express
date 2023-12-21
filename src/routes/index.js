// const usersRoute = require("./usersRoute");
const { readdirSync, statSync } = require("fs");
const { basename: pathBasename, join: pathJoin } = require("path");

const routes = require("express").Router();

const readRecursive = (dir) => {
  readdirSync(dir)
    .forEach(async (file) => {
      const filepath = pathJoin(dir, file);

      if (statSync(filepath).isDirectory()) {
        readRecursive(filepath);
      } else if (file !== pathBasename(__filename) && file.endsWith(".js") && !file.endsWith('.test.js')) {

        // require all files and use as route
        const route = require(filepath);
        routes.use(route);
      }
    });
}

readRecursive(__dirname);

module.exports = routes;