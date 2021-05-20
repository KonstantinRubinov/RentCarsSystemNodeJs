const carSchema = require("../models/Car");
var fs = require('fs');

function GetAllCars(){
    try {
        var cars = carSchema.find();
        return cars;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneCar(carNumber){
    try {
        var car = carSchema.findOne({carNumber: carNumber});
        return car;
    } catch (error) {
        throw Error(error);
    }
}

function AddCar(body){
    const newCar = new carSchema(body);
    return newCar.save().then((response) => {
        return response;
    }).catch(error => {
        throw Error(error);
    });
}

function UpdateCar(carNumber, body){
    try {
        var car = carSchema.findOneAndUpdate(carNumber, {$set: body});
        return car;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteCar(carNumber){
    try {
        var car = carSchema.findOneAndRemove({carNumber: carNumber});
        return car;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteCars(){
    carSchema.deleteMany((error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
        }
    })
}

function createGuid(){  
    function S4() {  
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
    }  
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
}

function UploadCarImage(carPicture, carImage, carNumber){
    let extension = carPicture.split(".");
    extension = extension[extension.length-1];
    let pictureName = createGuid()+"."+extension;
    let filePath = "./src/assets/images/cars/"+pictureName;
    carImage = carImage.replace(/^data:image\/\w+;base64,/, "");
    carImage = carImage.replace(/ /g, '+');
    let buff = new Buffer.from(carImage, 'base64');
    
    let fd =  fs.openSync(filePath, 'w');
    fs.write(fd, buff, 0, buff.length, 0, function(err,written){
        console.error( ">> "+ err );
        fs.closeSync( fd );
    });

    try {
        var car = carSchema.findOneAndUpdate(carNumber, {pictureName: pictureName});
        return car;
    } catch (error) {
        throw Error(error);
    }
};

function GetCarImages(){
    var cars = carSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            let groupedByPicture = Enumerable.From(response)
                .GroupBy(function(item) { return item.carPicture; })
                .Select(function(item) { return {"carPictureLink":"/src/assets/images/cars/" + item.source[0].carPicture, "carPictureName":item.source[0].carPicture, "numberOfCars": item.source.length}; })
                .ToArray();
            return groupedByPicture;
        }
    })
    return cars;
}



module.exports ={
    GetAllCars:GetAllCars,
    GetOneCar:GetOneCar,
    AddCar:AddCar,
    UpdateCar:UpdateCar,
    DeleteCar:DeleteCar,
    DeleteCars:DeleteCars,
    UploadCarImage:UploadCarImage,
    GetCarImages:GetCarImages
};