const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

router.route("/roles").get(roleController.GetAllRoles);
router.route("/roles/:userLevel").get(roleController.GetOneRoleLevel);
router.route("/roles/:userRole").get(roleController.GetOneRoleRole);
router.route("/roles").post(roleController.AddRole);
router.route("/roles/:userLevel").put(roleController.UpdateRole);
router.route("/roles/:userLevel").delete(roleController.DeleteRoleLevel);
router.route("/roles/:userRole").delete(roleController.DeleteRoleRole);
router.route("/roles").delete(roleController.DeleteAllRoles);

module.exports = router;