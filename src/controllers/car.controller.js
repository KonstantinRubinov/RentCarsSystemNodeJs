const carService = require("../services/car.service");
const { validationResult } = require('express-validator');
var HttpStatus = require('http-status-codes');

exports.GetAllCars = async function (req, res) {
    try {
        var cars = await carService.GetAllCars();
        console.log('All cars found!');
        return res.status(HttpStatus.StatusCodes.OK).json(cars);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneCar = async function (req, res) {
    try {
        const carNumber = req.params.carNumber;
        var car = await carService.GetOneCar(carNumber);
        console.log('Car ' + carNumber + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(car);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddCar = async function (req, res) {
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
        
        var car = await carService.AddCar(req.body);
        console.log("Car " + req.body.carNumber + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(car);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateCar = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const carNumber = req.params.carNumber;
        var car = await carService.UpdateCar(carNumber, req.body);
        console.log("Car " + carNumber + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(car);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteCar = async function (req, res) {
    try {
        const carNumber = req.params.carNumber;
        var car = await carService.DeleteCar(carNumber);
        console.log('Car ' + carNumber + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: car});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteCars = async function (req, res) {
    try {
        var car = await carService.DeleteCars();
        console.log('All cars successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: car});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UploadCarImage = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const carNumber = req.params.carNumber;
        var car = await carService.UploadCarImage(req.body.carPicture, req.body.carImage, carNumber);
        console.log("Car image " + carNumber + " successfully uploaded!");
        return res.status(HttpStatus.StatusCodes.OK).json(car);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetCarImages = async function (req, res) {
    try {
        var carImages = await carService.GetCarImages();
        console.log('All car images found!');
        return res.status(HttpStatus.StatusCodes.OK).json(carImages);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}