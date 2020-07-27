// models/Branch.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let branchSchema = new Schema({
    //branchID: { type: String, unique: true },
    branchAddress: { type: String },
    branchLat: { type: Number },
    branchLng: { type: Number },
    branchName: { type: String }
    }, {collection: 'branches'}
)

branchSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.models.Branch || mongoose.model('Branch', branchSchema);