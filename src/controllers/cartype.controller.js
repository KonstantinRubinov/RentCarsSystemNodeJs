// controllers/cartype.controller.js

const express = require("express");
const router = express.Router();
const cartypeService = require("../services/cartype.service");

router.route("/CarTypes").get(cartypeService.GetAllCarTypes);
router.route("/CarTypes/:carTypeID").get(cartypeService.GetOneCarTypeById);
router.route("/CarTypes/:carType").get(cartypeService.GetOneCarTypeByType);
router.route("/CarTypes").post(cartypeService.AddCarType);
router.route("/CarTypes/:carTypeID").put(cartypeService.UpdateCarType);
router.route("/CarTypes/:carTypeID").delete(cartypeService.DeleteCarTypeById);
router.route("/CarTypes/:carType").delete(cartypeService.DeleteCarTypeByType);
router.route("/CarTypes").delete(cartypeService.DeleteCarTypes);

module.exports = router;