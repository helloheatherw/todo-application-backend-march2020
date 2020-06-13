const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "",
  user: "admin",
  password: "",
  database: "tasks"
})

app.get("/tasks", function(req, res) {
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

//Request body will look something like this
// const body = {
//   "description": "Tidy up spare room",
//   "completed": false,
//   "username": "heather"
// }

app.post("/tasks", function(req, res) {
  const query = "INSERT INTO task (description, completed, username) VALUES (?, ?, ?);";
  const querySelect = "SELECT * FROM task WHERE task_id = ?";

  connection.query(query, [req.body.description, req.body.completed, req.body.username], function(error, data) {
    if(error) {
      console.log("Error adding a task", error);
      res.status(500).json({
        error: error
      })
    } else {
      connection.query(querySelect, [data.insertId], function(error, data) {
        if(error) {
          console.log("Error getting the task", error);
          res.status(500).json({
            error: error
          })
        } else {
          res.status(201).json({
            task: data
          })
        }
      })
    }

  })
});


module.exports.tasks = serverless(app);