const express = require("express");
const router = express.Router();
const rentController = require("../controllers/rent.controller");
const authorize = require("../middlewares/auth");

router.route("/CarsForRent").get(authorize,rentController.GetAllRents);
router.route("/CarsForRent/:carNumber").get(authorize,rentController.GetRentsByCar);
router.route("/CarsForRent/:userID").get(authorize,rentController.GetRentsByUser);
router.route("/CarsForRent/:rentNumber").get(authorize,rentController.GetRentByNumber);
router.route("/CarsForRent").post(authorize,rentController.AddRent);
router.route("/CarsForRent/:rentNumber").put(authorize,rentController.UpdateRent);
router.route("/CarsForRent/:rentNumber").delete(authorize,rentController.DeleteRentByNumber);
router.route("/CarsForRent/:carNumber").delete(authorize,rentController.DeleteRentsByCar);
router.route("/getSumPrice").post(authorize,rentController.PriceForOrderIfAvaliable);



module.exports = router;