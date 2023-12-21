"use strict";

// external library to read environment variable
require("dotenv").config();
// node library
const express = require("express");
const { join: pathJoin } = require("path");
// external library
const nunjucks = require("nunjucks");
// other
const routes = require("./routes");

// set port
const port = process.env.PORT || 5000;

// environment
const nodeEnv = process.env.NODE_ENV;
const isDev = nodeEnv === "development";

const app = express();

// hide header
app.disable('x-powered-by');

// set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set public folder
app.use("/", express.static(pathJoin(__dirname, "public")));

// set view templates
app.set('views', pathJoin(__dirname, 'views'));
const nunjucksEnv = nunjucks.configure(pathJoin(__dirname, 'views'), {
  trimBlocks: true,
  lstripBlocks: true,
  noCache: isDev,
  express: app,
});

nunjucksEnv.addFilter("is_active", (str = "", reg = "", page = "") => {
  reg = new RegExp(reg, 'gm');
  reg = reg.exec(page);
  if (reg != null) {
    return str;
  }
})

app.set('view engine', 'njk');

// set routes
app.use("/", routes);

// handle 404
app.use(function (req, res, next) {
  const error = new Error(`${req.method.toUpperCase()} '${req.url}' not found.`);
  // return a views or a json
  return res.status(404).send({ message: error.message, error });
});

// handle 500 - Any server error
app.use(function (error, req, res, next) {
  // return a views or a json
  return res.status(error?.statusCode || 500).send({ message: error.message, error });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})