const joinedModels = require("../models/JoinedModels");
const priceService = require("./price.service");
const priceLogic = require("../logics/price.logic");

let fullCars=[];
let searchReturnModel = {fullCarsData:"", fullCarsDataLenth:0, fullCarsDataPage:0};

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

function EditArray(item, searchModel) {

    if (searchModel.fromDate != null && searchModel.toDate != null)
	{
		item.carAvaliable = priceService.CheckIfCarAvaliable(item.carNumber, searchModel.fromDate, searchModel.toDate);
		if (item.carAvaliable)
		{
			item.carPrice = priceLogic.CarPrice(searchModel.fromDate, searchModel.toDate, item.carDayPrice);
			AddItem(item);
		}
	}
	else
	{
        AddItem(item);
	}
}

function GetAllCarsBySearch(page, carsNum, searchModel)
{
    let whereCar = {};
    let whereCarType = {path:'carType'};
    let match = {};
    
    if(searchModel.freeSearch != null && searchModel.freeSearch != "" && searchModel.freeSearch != "undefined"){
        match = {$or: [{ carFirm: { $regex: searchModel.freeSearch, $options: "i" } }, { carModel: { $regex: searchModel.freeSearch, $options: "i" } }]};
        whereCarType.match=match;
    }

    if(searchModel.company != null && searchModel.company != "" && searchModel.company != "undefined"){
        match.carFirm = searchModel.company;
        whereCarType.match=match;
    }

    if(searchModel.carType != null && searchModel.carType != "" && searchModel.carType != "undefined"){
        match.carType = searchModel.carType;
        whereCarType.match=match;
    }

    if(searchModel.gear != null && searchModel.gear != "" && searchModel.gear != "undefined"){
        match.carGear = searchModel.gear;
        whereCarType.match=match;
    }

    if(searchModel.year != null && searchModel.year != "" && searchModel.year != "undefined" && searchModel.year != 0){
        match.carYear = searchModel.year;
        whereCarType.match=match;
    }
    
    return joinedModels.Car.find(whereCar).populate(whereCarType).populate("carBranch").sort('carNumber')
    .then(response => {              
        response.forEach(EditArray);
        if(response==null || response=="" || response=="undefined"){
            searchReturnModel.fullCarsDataLenth = 0;
        } else{
            searchReturnModel.fullCarsDataLenth = fullCars.length;
        }
        fullCars = fullCars.slice(page * carsNum, page * carsNum + carsNum);
        searchReturnModel.fullCarsData = fullCars;
        searchReturnModel.fullCarsDataPage = page;
        fullCars=[];
        return searchReturnModel;
    })
    .catch(error => 
        {
            throw Error(error);
        }
    );
}

module.exports ={
    GetAllCarsBySearch:GetAllCarsBySearch
};