const rentSchema = require("../models/Rent");
const joinedModels = require("../models/JoinedModels");

function GetAllRents(){
    try {
        var rents = rentSchema.find();
        return rents;
    } catch (error) {
        throw Error(error);
    }
}

async function GetCarsForRentByCarNumber(carNumber){
    return rentSchema.find({carNumber: carNumber}).sort({ rentStartDate: 1 })
    .then(response => {              
        if(Array.isArray(response)){
            return response;
        } else{
            let myArray=[];
            myArray.push(response);
            return myArray;
        }
    })
    .catch(error => 
        {
            throw Error(error);
        }
    );
}

function GetRentsByUser(userID){
    return joinedModels.Rent.find({ userID: userID }).populate("car").populate("carType").populate("carBranch")
    .then(function(response) {
        response.forEach(AddItem);
        return fullCars;
    })
    .catch(function(error) {
        throw Error(error);
    });
};

function GetRentByNumber(rentNumber){
    try {
        var rent = rentSchema.findOne({rentNumber: rentNumber});
        return rent;
    } catch (error) {
        throw Error(error);
    }
}

function AddRent(userID, body){
    const newRent = new rentSchema(body);
    newRent.userID = userID;
    return newRent.save().then((response) => {
        return response;
    }).catch(error => {
        throw Error(error);
    });
};

function UpdateRent(rentNumber, body){
    try {
        var rent = rentSchema.findOneAndUpdate(rentNumber, {$set: body});
        return rent;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteRentByNumber(rentNumber){
    try {
        var rent = rentSchema.findOneAndRemove({rentNumber: rentNumber});
        return rent;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteRentsByCar(carNumber){
    rentSchema.remove({carNumber: carNumber}, (error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
        }
    })
}

function DeleteRents(){
    rentSchema.deleteMany((error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
        }
    })
}

let fullCars=[];

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

function GetRentsByCar(carNumber){
    return rentSchema.find({ carNumber: carNumber }).sort({ rentStartDate: 1 })
    .then(function(response) {
        return response;
    })
    .catch(function(error) {
        throw Error(error);
    });
}

module.exports ={
    GetAllRents:GetAllRents,
    GetCarsForRentByCarNumber:GetCarsForRentByCarNumber,
    GetRentsByUser:GetRentsByUser,
    GetRentByNumber:GetRentByNumber,
    AddRent:AddRent,
    UpdateRent:UpdateRent,
    DeleteRentByNumber:DeleteRentByNumber,
    DeleteRentsByCar:DeleteRentsByCar,
    DeleteRents:DeleteRents,
    GetRentsByCar:GetRentsByCar
};