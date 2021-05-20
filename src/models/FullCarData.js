// models/FullCarData.js

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let fullCarDataSchema = new Schema({
//     carNumber: { type: String, required: true },
//     carKm: { type: Number, required: true },
//     carPicture: { type: String, required: true },
//     carInShape: { type: Boolean },
//     carAvaliable: { type: Boolean },
//     carBranchID: { type: Number },
//     carType: { type: String, required: true },
//     carFirm: { type: String, required: true },
//     carModel: { type: String, required: true },
//     carDayPrice: { type: Number },
//     carLatePrice: { type: Number },
//     carYear: { type: Number },
//     carGear: { type: String },
//     branchName: { type: String },
//     branchAddress: { type: String, required: true },
//     branchLat: { type: Number, required: true },
//     branchLng: { type: Number, required: true },
// }, {collection: 'fullCarsData'}
// )
// module.exports = mongoose.model('FullCarData', fullCarDataSchema)

//module.exports = mongoose.model('FullCarData', {Car: require("./Car"), CarType: require("./CarType"), Branch: require("./Branch"), Rent: require("./Rent")});