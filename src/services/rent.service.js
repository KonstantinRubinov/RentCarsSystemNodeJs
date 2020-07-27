// services/rent.service.js

const express = require("express");
const rentSchema = require("../models/Rent");
const joinedModels = require("../models/JoinedModels");
const carSchema = require("../models/Car");
const decoded = require("../middlewares/decoded");
var HttpStatus = require('http-status-codes');

// Get Rents
function GetAllRents(req, res){
    rentSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Rents");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Rents by Car
async function GetCarsForRentByCarNumber(carNumber){
    return rentSchema.find({carNumber: carNumber}).sort({ rentStartDate: 1 }).exec(function (error, response) {
        if (error) {
            console.error(error);
            return error;
        } else {
            if(Array.isArray(response)){
                //console.debug("GetCarsForRentByCarNumberArray "+response);
                return response;
            } else{
                let myArray=[];
                myArray.push(response);
                //console.debug("GetCarsForRentByCarNumberObject "+response);
                return myArray;
            }
        }
    });
}

// Get Rents by Car
async function GetCarsForRentByCarNumberPromise(carNumber){
    return new Promise(function(resolve, reject) {
        rentSchema.find({carNumber: carNumber}).sort({ rentStartDate: 1 }).exec(function (error, response) {
            if (error) {
                console.error(error);
                resolve(error);
            } else {
                if(Array.isArray(response)){
                    //console.debug("GetCarsForRentByCarNumberPromiseArray "+response);
                    resolve(response);
                } else{
                    let myArray=[];
                    myArray.push(response);
                    //console.debug("GetCarsForRentByCarNumberPromiseObject "+response);
                    resolve(myArray);
                }
            }
        });
        
    })
}

// Get AllData by UserId
function GetRentsByUser(req, res, next){
    const userID = req.params.userID;
    joinedModels.Rent.find({ userID: userID }).populate("car").populate("carType").populate("carBranch")
    .then(function(response) {
        response.forEach(AddItem);
        res.status(HttpStatus.OK).json(fullCars);
    })
    .catch(function(error) {
        console.error(error);
        return next(error);
    });
};

// Get Rent by Number
function GetRentByNumber(req, res, next){
    const rentNumber = req.params.rentNumber;
    rentSchema.findOne({ rentNumber: rentNumber }), (error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Rents");
            res.status(HttpStatus.OK).json(response);
        }
    }
}

// Add Rent
function AddRent(req, res, next){
    const userID = decoded(req).userID;
    const newRent = new rentSchema(req.body);
    newRent.userID = userID;
    //console.debug("newRent "+newRent);
    newRent.save().then((response) => {
        //console.debug("Rent successfully added! " + response);
        res.status(HttpStatus.CREATED).json({message: "Rent successfully added!", result: response});
    }).catch(error => {
        console.error(error);
        return next(error);
    });
};

// Update Rent
function UpdateRent(req, res, next){
    const rentNumber = req.params.rentNumber;
    rentSchema.findOneAndUpdate({rentNumber: rentNumber}, {$set: req.body}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Rent ' + rentNumber + ' successfully updated!');
            res.status(HttpStatus.OK).json(data);
        }
    })
}

// Delete Rent By Rent Number
function DeleteRentByNumber(req, res, next){
    const rentNumber = req.params.rentNumber;
    rentSchema.findOneAndRemove({rentNumber: rentNumber}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Rent ' + rentNumber + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

// Delete Rents By Car Number
function DeleteRentsByCar(req, res, next){
    const carNumber = req.params.carNumber;
    rentSchema.remove({carNumber: carNumber}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Rents ' + carNumber + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

// Delete Rents
function DeleteRents(req, res, next){
    rentSchema.remove({}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Rents successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

let fullCars=[];

function AddItem(item){
    //console.debug(item);
    if(item!=null && item.carType!=null && item.carBranch!=null){
        let model = {
            carNumber:item.carNumber,
            carKm:item.carKm,
            carPicture:item.carPicture != null ? "src/assets/images/cars/" + item.carPicture : null,
            carInShape:item.carInShape,
            carAvaliable:item.carAvaliable,
            carType:item.carType.carType,
            carFirm:item.carType.carFirm,
            carModel:item.carType.carModel,
            carDayPrice:item.carType.carDayPrice,
            carLatePrice:item.carType.carLatePrice,
            carYear:item.carType.carYear,
            carGear:item.carType.carGear,
            branchName:item.carBranch.branchName,
            branchAddress:item.carBranch.branchAddress,
            branchLat:item.carBranch.branchLat,
            branchLng:item.carBranch.branchLng
        };
        fullCars.push(model);
    }
}

// Get Car by number
function GetOneCar(carNumber){
    carSchema.findOne({carNumber: carNumber}, (error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Cars");
            return response;
        }
    })
}

// Get Rents by Car
function GetRentsByCar(req, res, next){
    const carNumber = req.params.carNumber;
    rentSchema.find({carNumber: carNumber}).sort({ rentStartDate: 1 }).exec(function (error, response) {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Rents");
            res.status(HttpStatus.OK).json(response);
        }
    });
}

module.exports ={
    GetCarsForRentByCarNumber:GetCarsForRentByCarNumber,
    GetCarsForRentByCarNumberPromise:GetCarsForRentByCarNumberPromise,
    GetAllRents:GetAllRents,
    GetRentsByCar:GetRentsByCar,
    GetRentsByUser:GetRentsByUser,
    GetRentByNumber:GetRentByNumber,
    AddRent:AddRent,
    UpdateRent:UpdateRent,
    DeleteRentByNumber:DeleteRentByNumber,
    DeleteRentsByCar:DeleteRentsByCar,
    DeleteRents:DeleteRents
};