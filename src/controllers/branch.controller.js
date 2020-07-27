// controllers/branch.controller.js

const express = require("express");
const router = express.Router();
const branchService = require("../services/branch.service");

router.route("/branches").get(branchService.GetAllBranches);
router.route("/branches/:NameId").get(branchService.GetAllBrancheNamesIds);
router.route("/branches/:branchID").get(branchService.GetOneBranch);
router.route("/branches/:branchAddress").get(branchService.GetOneBranchByAddress);
router.route("/branches").post(branchService.AddBranch);
router.route("/branches/:branchID").put(branchService.UpdateBranch);
router.route("/branches/:branchID").delete(branchService.DeleteBranch);
router.route("/branches").delete(branchService.DeleteBranches);

module.exports = router;