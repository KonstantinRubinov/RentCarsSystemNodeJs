const searchService = require("../services/search.service");
const priceService = require("../services/price.service");
const fullCarDataService = require("../services/fullCarData.service");
var HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

exports.GetAllCarsBySearch = async function (req, res) {
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
        
        let page = req.headers.page;
        let carsNum = 5;
        if(req.headers.carsNum != null && req.headers.carsNum != "" && req.headers.carsNum != "undefined"){
            req.headers.carsNum;
        } else {
            carsNum=5;
        }
        
        var searchReturnModel = await searchService.GetAllCarsBySearch(page, carsNum, req.body);
        console.log("Cars successfully found!");
        return res.status(HttpStatus.StatusCodes.OK).json(searchReturnModel);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.CheckIfCarAvaliable = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json(errors.array());
        }
        
        let carNumber = req.headers.carNumber;
        
        let toDate = searchModel.toDate;
	    let fromDate = searchModel.fromDate;
        var price = await priceService.CheckIfCarAvaliable(carNumber, fromDate, toDate);
        console.log("Price successfully found!");
        return res.status(HttpStatus.StatusCodes.OK).json(price);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetCarAllData = async function (req, res) {
    try {
        const carNumber = req.params.carNumber;
        var fullCar = await fullCarDataService.GetCarAllData(carNumber);
        console.log('Full Car ' + carNumber + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(fullCar);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}