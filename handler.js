const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/tasks", function(req, res) {
  const taskDetail = req.query.taskDescription;

  res.send({ tasks: ["water plants", "do dishes", "buy oats", taskDetail] });
});


module.exports.tasks = serverless(app);