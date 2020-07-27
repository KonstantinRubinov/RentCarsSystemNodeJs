// models/Car.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let carSchema = new Schema({
    carNumber: { type: String, required: true, unique: true },
    carKm: { type: Number, required: true },
    carPicture: { type: String, required: true },
    carInShape: { type: Boolean },
    carAvaliable: { type: Boolean },
    carTypeID: { type: Number },
    branchID: { type: Number },
    carType: { type: Schema.Types.ObjectId, ref: 'CarType' },
    carBranch: { type: Schema.Types.ObjectId, ref: 'Branch' }
    }, {collection: 'cars'}
)

carSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.models.Car || mongoose.model('Car', carSchema);