const joinedModels = require("../models/JoinedModels");
const priceLogic = require("../logics/price.logic");
const rentService = require("../services/rent.service");
var HttpStatus = require('http-status-codes');

async function PriceForOrderIfAvaliable(carNumber, rentStartDate, rentEndDate)
{
	let isAvaliable = await CheckIfCarAvaliable(carNumber, rentStartDate, rentEndDate);
	let carForPrice={};
	if (isAvaliable == true)
	{
		var price = GetCarDayPrice(carNumber)
		.then(function(carDayPrice) {
			carForPrice.orderDays = priceLogic.DifferenceBetweenDatesInDays(rentEndDate, rentStartDate);
			carForPrice.carPrice = priceLogic.CarPrice(rentStartDate, rentEndDate, carDayPrice);
			return carForPrice;
		})
		.catch(function(error) {
			throw Error(error);
		});
		return price;
	}
	else
	{
		let errorMessage="priceForOrderIfAvaliable DateNotAvaliableException: " + "The Car Is Not Avaliable at this dates"
		console.error(errorMessage);
		let error=new Error(errorMessage);
		error.statusCode = HttpStatus.StatusCodes.FORBIDDEN;
		throw Error(error);
	}
}

async function GetCarDayPrice(carNumber)
{
    return joinedModels.Car.findOne({ carNumber: carNumber }).populate("carType")
    .then(function(full_car) {
      	return full_car.carType.carDayPrice;
    })
    .catch(function(error) {
        throw Error(error);
	});
}

function CheckIfCarAvaliable(carNumber, fromDate, toDate)
{
	let carForRentList = rentService.GetCarsForRentByCarNumber(carNumber);
	if (carForRentList != null && carForRentList.length > 0)
	{
		if (toDate<carForRentList[0].rentStartDate)
		{
			return true;
		}
		if (fromDate>carForRentList[carForRentList.length - 1].rentEndDate)
		{
			return true;
		}
    
		for (let i = 0; i < carForRentList.length - 1; i++)
		{
			if (fromDate>carForRentList[i].rentEndDate && toDate<carForRentList[i + 1].rentStartDate)
			{
				return true;
			}
		}
		return false;
	}
	else
	{
		return true;
	}
}


module.exports ={
	PriceForOrderIfAvaliable:PriceForOrderIfAvaliable,
    GetCarDayPrice:GetCarDayPrice,
	CheckIfCarAvaliable:CheckIfCarAvaliable
};