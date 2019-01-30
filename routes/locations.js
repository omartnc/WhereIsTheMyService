const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Location, validate } = require("../models/location");
const {User} = require('../models/user');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const locations = await Location.find().sort("title");
  res.send(locations);
});
router.get("/:userId", [auth], async (req, res) => {
  const locations = await Location.find({ 'user._id': req.params.userId }).sort("title");
  res.send(locations);
});
router.get("/:id", [auth], async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location)
    return res.status(404).send("The location with the given ID was not found.");

  res.send(location);
});

router.post("/", auth, async (req, res) => { 
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  let location = new Location({
    title: req.body.title,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    user: user
  });
  location = await location.save();

  res.send(location);
});

router.put("/:id", [admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  const location = await Location.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      user:user
    },
    {
      new: true
    }
  );

  if (!location)
    return res.status(404).send("The location with the given ID was not found.");

  res.send(location);
});

router.delete("/:id", [admin], async (req, res) => {
  const location = await Location.findByIdAndRemove(req.params.id);

  if (!location)
    return res.status(404).send("The location with the given ID was not found.");

  res.send(location);
});


module.exports = router;
