const joinedModels = require("../models/JoinedModels");
const priceService = require("./price.service");

function AddItem(item){
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

function GetCarAllData(carNumber){
    return joinedModels.Car.findOne({carNumber:carNumber}).populate("carType").populate("carBranch").sort('carNumber')
    .then(function(response) {
        response=AddItem(response);
        return response;
    })
    .catch(function(error) {
        throw Error(error);
    });
};

module.exports ={
    GetCarAllData:GetCarAllData
};