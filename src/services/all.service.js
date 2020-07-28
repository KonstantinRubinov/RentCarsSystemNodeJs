// Delete All
const express = require("express");
const branchSchema = require("../models/Branch");
const carSchema = require("../models/Car");
const roleSchema = require("../models/role");
const carTypeSchema = require("../models/CarType");
const rentSchema = require("../models/Rent");
var HttpStatus = require('http-status-codes');

async function DeleteRoles(){
    return roleSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return false;
        } else {
            console.log('All roles has been removed!');
            return true;
        }
    })
}

async function DeleteBranches(){
    return branchSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return false;
        } else {
            console.log('All branches has been removed!');
            return true;
        }
    })
}

async function DeleteCarTypes(){
    return carTypeSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return false;
        } else {
            console.log('All car types has been removed!');
            return true;
        }
    })
}

async function DeleteCars(){
    return carSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return false;
        } else {
            console.log('All cars has been removed!');
            return true;
        }
    })
}

async function DeleteRents(){
    return rentSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return false;
        } else {
            console.log('All rents has been removed!');
            return true;
        }
    })
}

async function DeleteAll(req, res, next){
    let deleted=true;
    let err: any;
        err=new Error("Not all deleted");
	    err.statusCode = HttpStatus.NOT_FOUND;
    deleted=await DeleteRoles();
    if(deleted==false) return next(err);
    deleted=await DeleteBranches();
    if(deleted==false) return next(err);
    deleted=await DeleteCarTypes();
    if(deleted==false) return next(err);
    deleted=await DeleteCars();
    if(deleted==false) return next(err);
    deleted=await DeleteRents();
    if(deleted==false) return next(err);

    res.status(HttpStatus.NO_CONTENT).json({result: "Everyrthing Deleted"});
}

module.exports ={
    DeleteAll:DeleteAll
};