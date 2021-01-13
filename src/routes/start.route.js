const express = require("express");
const router = express.Router();
const startService = require("../services/start.service");

router.route("/").get(startService.GetHtml);
router.route("/home").get(startService.GetHtml);
router.route("/styles.428b33c116ec3804eee7.css").get(startService.GetCss);
router.route("/favicon.ico").get(startService.GetFavicon);
router.route("/main.ed4bd299c6d5d3ef0f0e.js").get(startService.GetMain);
router.route("/polyfills.bb5375064c51ff42a92f.js").get(startService.GetPolyfills);
router.route("/runtime.ec2944dd8b20ec099bf3.js").get(startService.GetRuntime);
router.route("/assets/images/vwheel.png").get(startService.GetWheel);

module.exports = router;