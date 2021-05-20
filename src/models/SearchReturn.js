// models/SearchReturn.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let searchReturnSchema = new Schema({
    fullCarsData: [fullCarsData],
    fullCarsDataLenth: { type: Number },
    fullCarsDataPage: { type: Number }
    }, {collection: 'searchReturns'}
)

module.exports = mongoose.models.SearchReturn || mongoose.model('SearchReturn', searchReturnSchema);