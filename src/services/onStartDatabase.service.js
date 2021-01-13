const roleSchema = require("../models/Role");
const branchSchema = require("../models/branch");
const cartypeSchema = require("../models/cartype");
const carSchema = require("../models/car");

let t = true;
let f = false;
let i = 0;
let roles = [
    {userLevel: 0, userRole:"Guest"},
    {userLevel: 1, userRole:"User"},
    {userLevel: 2, userRole:"Manager"},
    {userLevel: 3, userRole:"Admin"}
];
let data = [
    {
        branchModel:{branchAddress: "Reshon-Letzion, Reshonim, Rozhensky 10", branchLat: 31.9867863, branchLng:34.7707802, branchName: "Reshonim"},
        carTypeModel:{carType:"Mazda 6 Sedan", carFirm:"Mazda", carModel:"M 6 Sedan", carDayPrice:1300.00, carLatePrice:263.00, carYear:2016, carGear:"manual"},
        carModel:{carKm:0, carPicture:"4a730b5f-9299-488e-b454-6867625a7c6a.png", carInShape:t, carAvaliable:t, carNumber:"20587465", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Jerusalem, Aisee, Shuk Mahane-Ehuda", branchLat: 31.7841818, branchLng:35.2120812, branchName: "Aisee"},
        carTypeModel:{carType:"Jaguar XF 2 Sedan", carFirm:"Jaguar", carModel:"XF 2 Sedan", carDayPrice:2400.89, carLatePrice:400.00, carYear:2012, carGear:"automatic"},
        carModel:{carKm:0, carPicture:"3c33a352-9a65-4cc3-a237-c90946fda446.png", carInShape:t, carAvaliable:t, carNumber:"25825847", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Holon, Beit HaRekev 6, Nativ Ha Asara 23", branchLat: 31.9722855, branchLng:34.77903, branchName: "Beit HaRekev 6"},
        carTypeModel:{carType:"Skoda Rapid Sedan", carFirm:"Skoda", carModel:"Rapid Sedan", carDayPrice:1583.23, carLatePrice:250.00, carYear:2018, carGear:"hybrid"},
        carModel:{carKm:0, carPicture:"0d87e188-305e-4467-9d59-4287a9c51766.png", carInShape:t, carAvaliable:t, carNumber:"2457814", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Tel Aviv, Aliyat Ha Noar, Nahelet Izhak 54", branchLat: 32.0756144, branchLng:34.8079408, branchName: "Aliyat Ha Noar"},
        carTypeModel:{carType:"Renault Celio Universal", carFirm:"Renault", carModel:"Celio Universal", carDayPrice:1073.31, carLatePrice:252.00, carYear:2014, carGear:"automatic"},
        carModel:{carKm:0, carPicture:"0e773d44-d4c1-44dc-a7ef-1c28c0bc6bbf.png", carInShape:t, carAvaliable:t, carNumber:"1425785", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Tel Aviv, Mizpe Azrieli, Menahem Begin 132", branchLat: 32.0743942, branchLng:34.794358, branchName: "Mizpe Azrieli"},
	    carTypeModel:{carType:"Chevrolet Spark Universal", carFirm:"Chevrolet", carModel:"Spark Universal", carDayPrice:714.37, carLatePrice:28.23, carYear:2016, carGear:"manual"},
	    carModel:{carKm:0, carPicture:"3a56e46b-1645-4f25-b495-4d9ef857e5e9.png", carInShape:t, carAvaliable:t, carNumber:"262531", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Ashkelon, AutoFix, HaPninim 19", branchLat: 31.664042, branchLng:34.6018696, branchName: "AutoFix"},
	    carTypeModel:{carType:"Subaru Impreza Universal", carFirm:"Subaru", carModel:"Impreza Universal", carDayPrice:1000.23, carLatePrice:123.00, carYear:2014, carGear:"hybrid"},
	    carModel:{carKm:0, carPicture:"1ff043b3-10eb-49eb-84ed-5c08d17759de.png", carInShape:t, carAvaliable:t, carNumber:"25156485", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Beer Sheva, Big Center, Hevron st 21", branchLat: 31.2438616, branchLng:34.8119657, branchName: "Big Center"},
	    carTypeModel:{carType:"Jeep Cherokee Universal", carFirm:"Jeep", carModel:"Cherokee Universal", carDayPrice:1804.28, carLatePrice:200.00, carYear:2016, carGear:"manual"},
	    carModel:{carKm:0, carPicture:"0a55b13b-fdca-426f-b080-5b808189d469.png", carInShape:t, carAvaliable:t, carNumber:"14785658", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Tel Aviv, Sharona Center, Nitham Sharona", branchLat: 32.0724094, branchLng:34.7953738, branchName: "Sharona Center"},
	    carTypeModel:{carType:"Kia Sportage Universal", carFirm:"Kia", carModel:"Sportage Universal", carDayPrice:895.36, carLatePrice:125.00, carYear:2011, carGear:"automatic"},
	    carModel:{carKm:0, carPicture:"1bbf1ca1-611f-4425-b147-80c705e2e8e4.png", carInShape:t, carAvaliable:t, carNumber:"845742", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Beer Sheva, Ofer Geand Kanion, David Toviahu 125", branchLat: 31.2503705, branchLng:34.7717336, branchName: "Ofer Geand Kanion"},
	    carTypeModel:{carType:"Seat Ibiza Kombi", carFirm:"Seat", carModel:"Ibiza Kombi", carDayPrice:1583.23, carLatePrice:254.66, carYear:2016, carGear:"hybrid"},
	    carModel:{carKm:0, carPicture:"1dde854c-a43b-4963-9062-3f7c75982106.png", carInShape:t, carAvaliable:t, carNumber:"85844487", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Reshon-Letzion, Reshonim, Rozhensky 10", branchLat: 31.9867863, branchLng:34.7707802, branchName: "Reshonim"},
	    carTypeModel:{carType:"Peugeot NEW 308 Mini Van", carFirm:"Peugeot", carModel:"NEW 308 Mini Van", carDayPrice:1000.23, carLatePrice:123.00, carYear:2017, carGear:"automatic"},
	    carModel:{carKm:0, carPicture:"2f9c06ea-5c1d-411f-a781-579fd4fed7cf.png", carInShape:t, carAvaliable:t, carNumber:"208456", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Jerusalem, Aisee, Shuk Mahane-Ehuda", branchLat: 31.7841818, branchLng:35.2120812, branchName: "Aisee"},
	    carTypeModel:{carType:"Fiat 500 Mini Van", carFirm:"Fiat", carModel:"500 Mini Van", carDayPrice:751.57, carLatePrice:122.00, carYear:2013, carGear:"manual"},
	    carModel:{carKm:0, carPicture:"2eee73f6-54c7-4024-a3bf-d9aa4971b0b1.png", carInShape:t, carAvaliable:t, carNumber:"35735748", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Holon, Beit HaRekev 6, Nativ Ha Asara 23", branchLat: 31.9722855, branchLng:34.77903, branchName: "Beit HaRekev 6"},
	    carTypeModel:{carType:"Hyundai I30 Universal", carFirm:"Hyundai", carModel:"I30 Universal", carDayPrice:891.20, carLatePrice:25.00, carYear:2015, carGear:"hybrid"},
	    carModel:{carKm:0, carPicture:"2c5c9a7d-ce5c-43c0-9f53-8af035e89e30.png", carInShape:t, carAvaliable:t, carNumber:"346758", carType:"", carBranch:""}
    },
    {
        branchModel:{branchAddress: "Tel Aviv, Aliyat Ha Noar, Nahelet Izhak 54", branchLat: 32.0756144, branchLng:34.8079408, branchName: "Aliyat Ha Noar"},
	    carTypeModel:{carType:"Chevrolet Impala Sedan", carFirm:"Chevrolet", carModel:"Impala Sedan", carDayPrice:1400.00, carLatePrice:230.00, carYear:2016, carGear:"automatic"},
	    carModel:{carKm:0, carPicture:"3e05e08b-de89-474f-a628-7f8dd1de25df.png", carInShape:t, carAvaliable:t, carNumber:"9498756", carType:"", carBranch:""}
    }
    //{
        // branchModel:{branchAddress: "Tel Aviv, Mizpe Azrieli, Menahem Begin 132", branchLat: 32.0743942, branchLng:34.794358, branchName: "Mizpe Azrieli"},
        // carTypeModel:{carType:"Mazda Cx3 Universal", carFirm:"Mazda", carModel:"Cx3 Universal", carDayPrice:891.24, carLatePrice:50.41, carYear:2018, carGear:"manual"},
	    // carModel:{carKm:0, carPicture:"4a730b5f-9299-488e-b454-6867625a7c6a.png", carInShape:t, carAvaliable:t, carNumber:"20587465", carType:"", carBranch:""}
    //}
];

function AddRole(newRole){
    return newRole.save().then((response) => {
        console.debug("Role successfully added!");
        return response;
    }).catch(error => {
        console.error(error);
        throw Error(error);
    });
}

function AddBranch(newBranch){
    return newBranch.save().then((response) => {
        return response;
    }).catch(error => {
        console.error(error);
        throw Error(error);
    });
}

function AddCarType(newCarType){
    return newCarType.save().then((response) => {
        console.log("CarType successfully added!");
        return response;
    }).catch(error => {
        console.error(error);
        throw Error(error);
    });
}

function AddCar(newCar){
    return newCar.save().then((response) => {
        console.log("Car successfully added!");
        return response;
    }).catch(error => {
        console.error(error);
        throw Error(error);
    });
}

function LoopAdding(){
    AddBranch(new branchSchema(data[i].branchModel)).then(
        (branchModel)=> {
            data[i].carModel.carBranch=branchModel._id;
            AddCarType(new cartypeSchema(data[i].carTypeModel)).then(
                (carTypeModel)=> {
                    data[i].carModel.carType=carTypeModel._id;
                    AddCar(new carSchema(data[i].carModel)).then(
                        (carModel)=> {
                            console.debug(carModel);
                            i++;
                            if (i<data.length){
                                LoopAdding();
                            }
                        }
                    );
                }
            )
        }
    );
}

function AddRoles(){
    for (let i=0;i<roles.length;i++){
        AddRole(new roleSchema(roles[i]));
    }
}

function AddMongoData(){
    AddRoles();
    LoopAdding();
}

module.exports = {
    AddMongoData:AddMongoData
};