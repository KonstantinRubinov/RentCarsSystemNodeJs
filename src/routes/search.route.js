const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search.controller");

router.route("/search").post(searchController.GetAllCarsBySearch);
router.route("/search/:carNumber").post(searchController.CheckIfCarAvaliable);
router.route("/fullCarData").get(searchController.GetAllCarsBySearch);
router.route("/fullCarData/:carNumber").get(searchController.GetCarAllData);

module.exports = router;