const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//router.get("/", async (req, res) => {
//const users = await User.find().sort("name");
//res.send(users);
//});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(user);
});

module.exports = router;
