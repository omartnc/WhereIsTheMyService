const Joi = require("joi");
const config = require("config");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const users = require("./routes/users");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/WhereIsTheMyServiceDb")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", users);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
