const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());

const connection = mysql.createConnection({
  host: "...eu-west-1.rds.amazonaws.com",
  user: "admin",
  password: "...",
  database: "tasks"
})

app.get("/tasks", function(req, res) {
  const taskDetail = req.query.taskDescription;
  const query = "SELECT * FROM task;"

  connection.query(query, function(error, data) {
    if(error) {
      console.log("Error fetching tasks", error);
      res.status(500).json({
        error: error
      })
    } else {
      res.status(200).json({
        tasks: data
      })
    }
  });
});


module.exports.tasks = serverless(app);