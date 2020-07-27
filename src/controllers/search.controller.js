// controllers/search.controller.js

const express = require("express");
const router = express.Router();
const searchService = require("../services/search.service");
const priceService = require("../services/price.service");
const fullCarDataService = require("../services/fullCarData.service");

router.route("/search").post(searchService.GetAllCarsBySearch);
router.route("/search/:carNumber").post(priceService.CheckIfCarAvaliableByRequest);
router.route("/fullCarData").get(searchService.GetAllCarsBySearch);
router.route("/fullCarData/:carNumber").get(fullCarDataService.GetCarAllData);

module.exports = router;