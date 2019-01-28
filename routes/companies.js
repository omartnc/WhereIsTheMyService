const { Company, validate } = require("../models/company");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", [auth, admin], async (req, res) => {
  const companies = await Company.find().sort("name");
  res.send(companies);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = new Company({
    name: req.body.name,
    email: req.body.email
  });
  await company.save();
  res.send(company);
});

module.exports = router;
