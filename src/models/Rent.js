// models/Rent.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let rentSchema = new Schema({
    rentNumber: { type: Number },
    userID: { type: String, required: true },
    carNumber: { type: String, required: true },
    rentStartDate: { type: Date },
    rentEndDate: { type: Date },
    rentRealEndDate: { type: Date },
    carPrice: { type: Number },
    orderDays: { type: Number },
    car: { type: Schema.Types.ObjectId, ref: 'Car' },
    }, {collection: 'rents'}
)

rentSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.models.Rent || mongoose.model('Rent', rentSchema);