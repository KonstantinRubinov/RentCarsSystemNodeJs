// controllers/all.controller.js

const express = require("express");
const router = express.Router();
const allService = require("../services/all.service");

router.route("/all").delete(allService.DeleteAll);

module.exports = router;