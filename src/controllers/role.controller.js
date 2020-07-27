// controllers/role.controller.js

const express = require("express");
const router = express.Router();
const roleService = require("../services/role.service");

router.route("/roles").get(roleService.GetAllRoles);
router.route("/roles/:userLevel").get(roleService.GetOneRoleLevel);
router.route("/roles/:userRole").get(roleService.GetOneRoleRole);
router.route("/roles").post(roleService.AddRole);
router.route("/roles/:userLevel").put(roleService.UpdateRole);
router.route("/roles/:userLevel").delete(roleService.DeleteRoleLevel);
router.route("/roles/:userRole").delete(roleService.DeleteRoleRole);
router.route("/roles").delete(roleService.DeleteAllRoles);

module.exports = router;