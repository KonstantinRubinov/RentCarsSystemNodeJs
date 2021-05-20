const express = require("express");
const router = express.Router();
const cartypeController = require("../controllers/cartype.controller");

router.route("/CarTypes").get(cartypeController.GetAllCarTypes);
router.route("/CarTypes/:carTypeID").get(cartypeController.GetOneCarTypeById);
router.route("/CarTypes/:carType").get(cartypeController.GetOneCarTypeByType);
router.route("/CarTypes").post(cartypeController.AddCarType);
router.route("/CarTypes/:carTypeID").put(cartypeController.UpdateCarType);
router.route("/CarTypes/:carTypeID").delete(cartypeController.DeleteCarTypeById);
router.route("/CarTypes/:carType").delete(cartypeController.DeleteCarTypeByType);
router.route("/CarTypes").delete(cartypeController.DeleteCarTypes);

module.exports = router;