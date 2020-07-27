// controllers/rent.controller.js

const express = require("express");
const router = express.Router();
const rentService = require("../services/rent.service");
const priceService = require("../services/price.service");
const authorize = require("../middlewares/auth");

router.route("/CarsForRent").get(authorize,rentService.GetAllRents);
router.route("/CarsForRent/:carNumber").get(authorize,rentService.GetRentsByCar);
router.route("/CarsForRent/:userID").get(authorize,rentService.GetRentsByUser);
router.route("/CarsForRent/:rentNumber").get(authorize,rentService.GetRentByNumber);
router.route("/CarsForRent").post(authorize,rentService.AddRent);
router.route("/CarsForRent/:rentNumber").put(authorize,rentService.UpdateRent);
router.route("/CarsForRent/:rentNumber").delete(authorize,rentService.DeleteRentByNumber);
router.route("/CarsForRent/:carNumber").delete(authorize,rentService.DeleteRentsByCar);
router.route("/getSumPrice").post(authorize,priceService.PriceForOrderIfAvaliable);



module.exports = router;