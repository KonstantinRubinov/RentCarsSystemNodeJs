// services/carType.service.js

const express = require("express");
const router = express.Router();
const carTypeSchema = require("../models/CarType");
var HttpStatus = require('http-status-codes');

// Get Car Types
function GetAllCarTypes(req, res){
    carTypeSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Car Types");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Car Type by id
function GetOneCarTypeById(req, res, next){
    const carTypeID = req.params.carTypeID;
    carTypeSchema.findOne({carTypeID: carTypeID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data});
        }
    })
}

// Get Car Type by type
function GetOneCarTypeByType(req, res, next){
    const carType = req.params.carType;
    carTypeSchema.findOne({carType: carType}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data});
        }
    })
}

// Add Car Type
function AddCarType(req, res, next){
    const newCarType = new carTypeSchema(req.body);
    // console.debug(newCarType);
    newCarType.save().then((response) => {
        res.status(HttpStatus.CREATED).json({
            message: "Car Type successfully added!",
            result: response
        });
    }).catch(error => {
        console.error(error);
        return next(error);
    });
};

// Update Car Type
function UpdateCarType(req, res, next){
    const carTypeID = req.params.carTypeID;
    carTypeSchema.findOneAndUpdate({carTypeID: carTypeID}, {$set: req.body}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Car Type ' + carTypeID + ' successfully updated!');
            res.status(HttpStatus.OK).json(data);
        }
    })
}


// Delete Car Type
function DeleteCarTypeById(req, res, next){
    const carTypeID = req.params.carTypeID;
    carTypeSchema.findOneAndRemove({carTypeID: carTypeID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Car Type ' + carTypeID + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

// Delete Car Type
function DeleteCarTypeByType(req, res, next){
    const carType = req.params.carType;
    carTypeSchema.findOneAndRemove({carType: carType}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Car Type ' + carType + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

// Delete Branches
function DeleteCarTypes(req, res, next){
    carTypeSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All car types has been removed!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

module.exports ={
    GetAllCarTypes:GetAllCarTypes,
    GetOneCarTypeById:GetOneCarTypeById,
    GetOneCarTypeByType:GetOneCarTypeByType,
    AddCarType:AddCarType,
    UpdateCarType:UpdateCarType,
    DeleteCarTypeById:DeleteCarTypeById,
    DeleteCarTypeByType:DeleteCarTypeByType,
    DeleteCarTypes:DeleteCarTypes
};