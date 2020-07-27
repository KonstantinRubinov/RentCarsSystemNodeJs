// services/price.service.js
const joinedModels = require("../models/JoinedModels");
const priceLogic = require("../logics/price.logic");
const rentService = require("../services/rent.service");
var HttpStatus = require('http-status-codes');

function PriceForOrderIfAvaliable(req, res, next)
{
	let isAvaliable = CheckIfCarAvaliable(req.body.carNumber, req.body.rentStartDate, req.body.rentEndDate);
	let carForPrice={};
	if (isAvaliable == true)
	{
		//console.debug("carNumber "+req.body.carNumber);
		GetCarDayPrice(req.body.carNumber)
		.then(function(carDayPrice) {
			//console.debug("carDayPrice "+JSON.stringify(carDayPrice));
			carForPrice.orderDays = priceLogic.DifferenceBetweenDatesInDays(req.body.rentEndDate, req.body.rentStartDate);
			carForPrice.carPrice = priceLogic.CarPrice(req.body.rentStartDate, req.body.rentEndDate, carDayPrice);
			//console.debug("carForPrice "+JSON.stringify(carForPrice));
			res.status(HttpStatus.OK).json(carForPrice);
		})
		.catch(function(error) {
			console.error(error);
			return next(error);
		});
	}
	else
	{
		console.error("priceForOrderIfAvaliable DateNotAvaliableException: " + "The Car Is Not Avaliable at this dates");
		return next("priceForOrderIfAvaliable DateNotAvaliableException: " + "The Car Is Not Avaliable at this dates");
	}
}

async function GetCarDayPrice(carNumber)
{
    return joinedModels.Car.findOne({ carNumber: carNumber }).populate("carType")
    .then(function(full_car) {
		//console.debug("full_car "+full_car.carType.carDayPrice);
      	return(full_car.carType.carDayPrice);
    })
    .catch(function(error) {
        console.error(error);
	});
}

function CheckIfCarAvaliable(carNumber, fromDate, toDate)
{
	let carForRentList = rentService.GetCarsForRentByCarNumber(carNumber);
	if (carForRentList != null && carForRentList.Count > 0)
	{
		if (toDate<carForRentList[0].rentStartDate)
		{
			console.log("Before All Rents");
			return true;
		}
		if (fromDate>carForRentList[carForRentList.Count - 1].rentEndDate)
		{
			console.log("After All Rents");
			return true;
		}
    
		for (let i = 0; i < carForRentList.Count - 1; i++)
		{
			if (fromDate>carForRentList[i].rentEndDate && toDate<carForRentList[i + 1].rentStartDate)
			{
				console.log("Between" + carForRentList[i].rentEndDate + "And" + carForRentList[i + 1].rentStartDate + "Rents");
				return true;
			}
		}
		console.log("Allready Rented");
		return false;
	}
	else
	{
		console.log("First To Rent");
		return true;
	}
}

function CheckIfCarAvaliableByRequest(req, res, next)
{
	const carNumber = req.params.carNumber;
	let searchModel = req.body;
	let toDate = searchModel.toDate;
	let fromDate = searchModel.fromDate;

	carForRentList = rentService.GetCarsForRentByCarNumber(carNumber);
	if (carForRentList != null && carForRentList.Count > 0)
	{
		if (toDate<carForRentList[0].rentStartDate)
		{
			res.status(HttpStatus.OK).json(true);
		}
		if (fromDate>carForRentList[carForRentList.Count - 1].rentEndDate)
		{
			res.status(HttpStatus.OK).json(true);
		}
    
		for (let i = 0; i < carForRentList.Count - 1; i++)
		{
			if (fromDate>carForRentList[i].rentEndDate && toDate<carForRentList[i + 1].rentStartDate)
			{
				res.status(HttpStatus.OK).json(true);
			}
		}
		res.status(HttpStatus.OK).json(false);
	}
	else
	{
		res.status(HttpStatus.OK).json(false);
	}
}


module.exports ={
	PriceForOrderIfAvaliable:PriceForOrderIfAvaliable,
    GetCarDayPrice:GetCarDayPrice,
	CheckIfCarAvaliable:CheckIfCarAvaliable,
	CheckIfCarAvaliableByRequest:CheckIfCarAvaliableByRequest
};