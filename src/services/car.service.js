// services/car.service.js

const express = require("express");
const carSchema = require("../models/Car");
const carPictureSchema = require("../models/CarPicture");
var HttpStatus = require('http-status-codes');

// Get Cars
function GetAllCars(req, res){
    carSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Cars");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Car by number
function GetOneCar(req, res, next){
    const carNumber = req.params.carNumber;
    carSchema.findOne({carNumber: carNumber}, (error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Cars");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Add Car
function AddCar(req, res, next){
    const newCar = new carSchema(req.body);
    // console.debug(newCar);
    newCar.save().then((response) => {
        res.status(HttpStatus.CREATED).json({
            message: "Car successfully added!",
            result: response
        });
    }).catch(error => {
        console.error(error);
        return next(error);
    });
}

// Update Car
function UpdateCar(req, res, next){
    const carNumber = req.params.carNumber;
    carSchema.findOneAndUpdate({carNumber: carNumber}, {$set: req.body}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Car ' + carNumber + ' successfully updated!')
            res.status(HttpStatus.OK).json(data);
        }
    })
}

// Delete Car By Number
function DeleteCar(req, res, next){
    const carNumber = req.params.carNumber;
    carSchema.remove({carNumber: carNumber}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Car ' + carNumber + ' successfully deleted!')
            res.status(HttpStatus.NO_CONTENT).json({result: data})
        }
    })
}

// UploadCarImage
function UploadCarImage(req, res, next){
    let extension = req.body.carPicture.split(".");
    extension = extension[extension.length-1];
    let pictureName = createGuid()+"."+extension;
    let filePath = "./src/assets/images/cars/"+pictureName;
    req.body.carImage = req.body.carImage.replace(/^data:image\/\w+;base64,/, "");
    req.body.carImage = req.body.carImage.replace(/ /g, '+');
    let buff = new Buffer.from(req.body.carImage, 'base64');
    
    let fd =  fs.openSync(filePath, 'w');
    fs.write(fd, buff, 0, buff.length, 0, function(err,written){
        console.error( ">> "+ err );
        fs.closeSync( fd );
    });
    
    const carNumber = req.params.carNumber;
    carSchema.findOneAndUpdate({carNumber: carNumber}, {pictureName: pictureName},
        (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Image successfully updated!')
            res.status(HttpStatus.OK).json(data);
        }
    })
};

//Get Car Images
function GetCarImages(req, res){
    carSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            let groupedByPicture = Enumerable.From(response)
                .GroupBy(function(item) { return item.carPicture; })
                .Select(function(item) { return {"carPictureLink":"/src/assets/images/cars/" + item.source[0].carPicture, "carPictureName":item.source[0].carPicture, "numberOfCars": item.source.length}; })
                .ToArray();
            //console.debug(groupedByPicture + " Cars");
            res.status(HttpStatus.OK).json(groupedByPicture);
        }
    })
}

// Delete Cars
function DeleteCars(req, res, next){
    carSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All cars has been removed!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

module.exports ={
    GetAllCars:GetAllCars,
    GetOneCar:GetOneCar,
    AddCar:AddCar,
    UpdateCar:UpdateCar,
    DeleteCar:DeleteCar,
    UploadCarImage:UploadCarImage,
    GetCarImages:GetCarImages,
    DeleteCars:DeleteCars
};