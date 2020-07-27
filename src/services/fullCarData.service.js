const express = require("express");
const joinedModels = require("../models/JoinedModels");
const priceService = require("./price.service");
var HttpStatus = require('http-status-codes');

function AddItem(item){
    //console.debug(item);
    if(item!=null && item.carType!=null && item.carBranch!=null){
        let model = {
            carNumber:item.carNumber,
            carKm:item.carKm,
            carPicture:item.carPicture != null ? "src/assets/images/cars/" + item.carPicture : null,
            carInShape:item.carInShape,
            carAvaliable:priceService.CheckIfCarAvaliable(item.carNumber, Date.now(), Date.now()),
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
        return model;
    }
}
    
// Get GetCarAllData by carNumber
function GetCarAllData(req, res, next){
    const carNumber = req.params.carNumber;
    joinedModels.Car.findOne({carNumber:carNumber}).populate("carType").populate("carBranch").sort('carNumber')
    .then(function(response) {
        response=AddItem(response);
        //console.debug(response);
        res.status(HttpStatus.OK).json(response);
    })
    .catch(function(error) {
        console.error(error);
        return next(error);
    });
};

module.exports ={
    GetCarAllData:GetCarAllData
};