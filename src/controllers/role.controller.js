const roleService = require("../services/role.service");
var HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

exports.GetAllRoles = async function (req, res) {
    try {
        var roles = await roleService.GetAllRoles();
        console.log('All roles found!');
        return res.status(HttpStatus.StatusCodes.OK).json(roles);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneRoleLevel = async function (req, res) {
    try {
        const userLevel = req.params.userLevel;
        var role = await roleService.GetOneRoleLevel(userLevel);
        console.log('Role ' + userLevel + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneRoleRole = async function (req, res) {
    try {
        const userRole = req.params.userRole;
        var role = await roleService.GetOneRoleRole(userRole);
        console.log('Role ' + userRole + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddRole = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).jsonp(errors.array());
        }
        
        var role = await roleService.AddRole(req.body);
        console.log("Role " + req.body.userRole + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateRole = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const userLevel = req.params.userLevel;
        var role = await roleService.UpdateRole(userLevel, req.body);
        console.log("Role " + userLevel + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteRoleLevel = async function (req, res) {
    try {
        const userLevel = req.params.userLevel;
        var role = await roleService.DeleteRoleLevel(userLevel);
        console.log('Role ' + userLevel + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: role});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteRoleRole = async function (req, res) {
    try {
        const userRole = req.params.userRole;
        var role = await roleService.DeleteRoleRole(userRole);
        console.log('Role ' + userRole + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: role});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteAllRoles = async function (req, res) {
    try {
        var roles = await roleService.DeleteAllRoles();
        console.log('All branches successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: roles});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}