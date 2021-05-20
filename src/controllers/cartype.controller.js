const cartypeService = require("../services/cartype.service");
const { validationResult } = require('express-validator');
var HttpStatus = require('http-status-codes');

exports.GetAllCarTypes = async function (req, res) {
    try {
        var carTypes = await cartypeService.GetAllCarTypes();
        console.log('All carTypes found!');
        return res.status(HttpStatus.StatusCodes.OK).json(carTypes);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneCarTypeById = async function (req, res) {
    try {
        const carTypeID = req.params.carTypeID;
        var carType = await cartypeService.GetOneCarTypeById(carTypeID);
        console.log('Car type ' + carTypeID + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(carType);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneCarTypeByType = async function (req, res) {
    try {
        var carType = await cartypeService.GetOneCarTypeByType(req.params.carType);
        console.log('Car type ' + req.params.carType + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(carType);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddCarType = async function (req, res) {
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
        
        var carType = await cartypeService.AddCarType(req.body);
        console.log("Car type " + req.body.carType + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(carType);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateCarType = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const carTypeID = req.params.carTypeID;
        var carType = await cartypeService.UpdateCarType(carTypeID, req.body);
        console.log("Car type " + req.body.carType + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(carType);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteCarTypeById = async function (req, res) {
    try {
        const carTypeID = req.params.carTypeID;
        var carType = await cartypeService.DeleteCarTypeById(carTypeID);
        console.log('Car type ' + carTypeID + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: carType});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteCarTypeByType = async function (req, res) {
    try {
        var carType = await cartypeService.DeleteCarTypeByType(req.params.carType);
        console.log('Car type ' + req.params.carType + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: carType});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteCarTypes = async function (req, res) {
    try {
        var carType = await cartypeService.DeleteCarTypes();
        console.log('All car types successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: carType});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}