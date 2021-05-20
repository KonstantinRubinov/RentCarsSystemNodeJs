const carTypeSchema = require("../models/CarType");

function GetAllCarTypes(){
    try {
        var carTypes = carTypeSchema.find();
        return carTypes;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneCarTypeById(carTypeID){
    try {
        var carType = carTypeSchema.findOne({carTypeID: carTypeID});
        return carType;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneCarTypeByType(carType){
    try {
        var carType = carTypeSchema.findOne({carType: carType});
        return carType;
    } catch (error) {
        throw Error(error);
    }
}

function AddCarType(body){
    const newCarType = new carTypeSchema(body);
    return newCarType.save().then((response) => {
        return response;
    }).catch(error => {
        throw Error(error);
    });
};

function UpdateCarType(carTypeID, body){
    try {
        var carType = carTypeSchema.findOneAndUpdate(carTypeID, {$set: body});
        return carType;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteCarTypeById(carTypeID){
    try {
        var carType = carTypeSchema.findOneAndRemove({carTypeID: carTypeID});
        return carType;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteCarTypeByType(carType){
    try {
        var carType = carTypeSchema.findOneAndRemove({carType: carType});
        return carType;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteCarTypes(){
    carTypeSchema.deleteMany((error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
        }
    })
}

module.exports ={
    GetAllCarTypes:GetAllCarTypes,
    GetOneCarTypeById:GetOneCarTypeById,
    GetOneCarTypeByType:GetOneCarTypeByType,
    AddCarType:AddCarType,
    UpdateCarType:UpdateCarType,
    DeleteCarTypeById:DeleteCarTypeById,
    DeleteCarTypeByType:DeleteCarTypeByType,
    DeleteCarTypes:DeleteCarTypes
};