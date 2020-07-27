// models/CarType.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let carTypeSchema = new Schema({
    //carTypeID: { type: Number, required: true, unique: true },
    carType: { type: String, required: true },
    carFirm: { type: String, required: true },
    carModel: { type: String, required: true },
    carDayPrice: { type: Number },
    carLatePrice: { type: Number },
    carYear: { type: Number },
    carGear: { type: String }
    }, {collection: 'carTypes'}
)

carTypeSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.models.CarType || mongoose.model('CarType', carTypeSchema);