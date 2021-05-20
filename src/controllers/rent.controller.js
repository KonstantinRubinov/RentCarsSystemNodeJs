const rentService = require("../services/rent.service");
const priceService = require("../services/price.service");
var HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

exports.GetAllRents = async function (req, res) {
    try {
        var rents = await rentService.GetAllRents();
        console.log('All rents found!');
        return res.status(HttpStatus.StatusCodes.OK).json(rents);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetRentsByCar = async function (req, res) {
    try {
        const carNumber = req.params.carNumber;
        var rents = await rentService.GetRentsByCar(carNumber);
        console.log('Rents ' + carNumber + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(rents);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetRentsByUser = async function (req, res) {
    try {
        const userID = req.params.userID;
        var rents = await rentService.GetRentsByUser(userID);
        console.log('Rents ' + userID + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(rents);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetRentByNumber = async function (req, res) {
    try {
        const rentNumber = req.params.rentNumber;
        var rent = await rentService.GetRentByNumber(rentNumber);
        console.log('Rent ' + rentNumber + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(rent);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddRent = async function (req, res) {
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
        
        var rent = await rentService.AddRent(req.body);
        console.log("Rent " + req.body.rentNumber + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(rent);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateRent = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const rentNumber = req.params.rentNumber;
        var rent = await rentService.UpdateRent(rentNumber, req.body);
        console.log("Rent " + rentNumber + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(rent);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteRentByNumber = async function (req, res) {
    try {
        const rentNumber = req.params.rentNumber;
        var rent = await rentService.DeleteRentByNumber(rentNumber);
        console.log('Rent ' + rentNumber + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: rent});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteRentsByCar = async function (req, res) {
    try {
        const carNumber = req.params.carNumber;
        var rent = await rentService.DeleteRentsByCar(carNumber);
        console.log('Rents ' + carNumber + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: rent});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.PriceForOrderIfAvaliable = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        
        var price = await priceService.PriceForOrderIfAvaliable(req.body.carNumber, req.body.rentStartDate, req.body.rentEndDate);
        console.log('Price ' + carNumber + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(price);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}