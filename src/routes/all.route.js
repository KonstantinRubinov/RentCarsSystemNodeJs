const express = require("express");
const router = express.Router();
const allController = require("../controllers/all.controller");

router.route("/all").delete(allController.DeleteAll);

module.exports = router;