const homeController = require("../controller/home");

const homeRoute = require("express").Router();

homeRoute.get("/", homeController.index);

module.exports = homeRoute;