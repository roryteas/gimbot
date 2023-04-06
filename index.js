//test express server
// on elastic beanstalk, the port is set by the environment

const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

//get request to /api
app.get("/", (req, res) => {
  res.send("Hello World!");
});
