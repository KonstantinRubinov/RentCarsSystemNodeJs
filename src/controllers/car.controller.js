// controllers/car.controller.js

const express = require("express");
const router = express.Router();
const carService = require("../services/car.service");

router.route("/cars").get(carService.GetAllCars);
router.route("/cars/:carNumber").get(carService.GetOneCar);
router.route("/cars").post(carService.AddCar);
router.route("/cars/:carNumber").put(carService.UpdateCar);
router.route("/cars/:carNumber").delete(carService.DeleteCar);
router.route("/cars/file/:carNumber").post(carService.UploadCarImage);
router.route("/carimages").get(carService.GetCarImages);
router.route("/cars").delete(carService.DeleteCars);

module.exports = router;