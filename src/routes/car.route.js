const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");

router.route("/cars").get(carController.GetAllCars);
router.route("/cars/:carNumber").get(carController.GetOneCar);
router.route("/cars").post(carController.AddCar);
router.route("/cars/:carNumber").put(carController.UpdateCar);
router.route("/cars/:carNumber").delete(carController.DeleteCar);
router.route("/cars").delete(carController.DeleteCars);
router.route("/cars/file/:carNumber").post(carController.UploadCarImage);
router.route("/carimages").get(carController.GetCarImages);

module.exports = router;