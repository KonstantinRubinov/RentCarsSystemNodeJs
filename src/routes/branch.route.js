const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branch.controller");

router.route("/branches").get(branchController.GetAllBranches);
router.route("/branches/:NameId").get(branchController.GetAllBrancheNamesIds);
router.route("/branches/:branchID").get(branchController.GetOneBranch);
router.route("/branches/:branchAddress").get(branchController.GetOneBranchByAddress);
router.route("/branches").post(branchController.AddBranch);
router.route("/branches/:branchID").put(branchController.UpdateBranch);
router.route("/branches/:branchID").delete(branchController.DeleteBranch);
router.route("/branches").delete(branchController.DeleteBranches);

module.exports = router;