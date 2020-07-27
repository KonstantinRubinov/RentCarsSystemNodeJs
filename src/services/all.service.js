// Delete All
const express = require("express");
const branchSchema = require("../models/Branch");
const carSchema = require("../models/Car");
const roleSchema = require("../models/role");
const carTypeSchema = require("../models/CarType");
const rentSchema = require("../models/Rent");
var HttpStatus = require('http-status-codes');

function DeleteAll(req, res, next){
    roleSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All roles has been removed!');
            //res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })

    branchSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All branches has been removed!');
            //res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })

    carTypeSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All car types has been removed!');
            //res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
    
    carSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All cars has been removed!');
            //res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })

    rentSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All rents has been removed!');
            //res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

module.exports ={
    DeleteAll:DeleteAll
};