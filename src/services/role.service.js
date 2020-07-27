// services/role.service.js

const express = require("express");
const roleSchema = require("../models/role");
var HttpStatus = require('http-status-codes');

// Get Roles
function GetAllRoles(req, res){
    roleSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Cars");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Role by level
function GetOneRoleLevel(req, res, next){
    const userLevel = req.params.userLevel;
    roleSchema.findOne({userLevel: userLevel}, (error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Cars");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Role by role
function GetOneRoleRole(req, res, next){
    const userRole = req.params.userRole;
    roleSchema.findOne({userRole: userRole}, (error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Cars");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Add Role
function AddRole(req, res, next){
        const newRole = new roleSchema(req.body);
        // console.debug(newCar);
        newRole.save().then((response) => {
            console.log('Role successfully added!')
            res.status(HttpStatus.CREATED).json({
                message: "Role successfully added!",
                result: response
            });
        }).catch(error => {
            console.error(error);
            return next(error);
        });
}

// Update Role
function UpdateRole(req, res, next){
    const userLevel = req.params.userLevel;
    roleSchema.findOneAndUpdate({userLevel: userLevel}, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Role ' + userLevel + ' successfully updated!')
            res.status(HttpStatus.OK).json(data);
        }
    })
}

// Delete Car By Level
function DeleteRoleLevel(req, res, next){
    const userLevel = req.params.userLevel;
    roleSchema.findOneAndRemove({userLevel: userLevel}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Role ' + userLevel + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data})
        }
    })
}

// Delete Car By Role
function DeleteRoleRole(req, res, next){
    const userRole = req.params.userRole;
    roleSchema.findOneAndRemove({userRole: userRole}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Role ' + userRole + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

// Delete All Roles
function DeleteAllRoles(req, res, next){
    roleSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All roles has been removed!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

module.exports ={
    GetAllRoles:GetAllRoles,
    GetOneRoleLevel:GetOneRoleLevel,
    GetOneRoleRole:GetOneRoleRole,
    AddRole:AddRole,
    UpdateRole:UpdateRole,
    DeleteRoleLevel:DeleteRoleLevel,
    DeleteRoleRole:DeleteRoleRole,
    DeleteAllRoles:DeleteAllRoles
};