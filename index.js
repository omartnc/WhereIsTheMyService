const Joi = require("joi");
const config = require("config");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const users = require("./routes/users");
const auth = require("./routes/auth");
const companies = require("./routes/companies");

const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL EROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/WhereIsTheMyServiceDb")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/companies", companies);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
