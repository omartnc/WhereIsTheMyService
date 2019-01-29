const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Location, validate } = require("../models/location");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", [auth, admin], async (req, res) => {
  const locations = await Location.find().sort("title");
  res.send(locations);
});

router.post("/", [admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let location = new Location({
    title: req.body.title,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    userId: req.body.userId
  });
  location = await location.save();

  res.send(location);
});

router.put("/:id", [admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const location = await Location.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    },
    {
      new: true
    }
  );

  if (!location)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(location);
});

router.delete("/:id", [admin], async (req, res) => {
  const location = await Genre.findByIdAndRemove(req.params.id);

  if (!location)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(location);
});

router.get("/:id", [admin], async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(location);
});

module.exports = router;
