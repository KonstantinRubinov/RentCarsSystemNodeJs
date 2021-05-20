// models/Search.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let searchSchema = new Schema({
    fromDate: { type: Date },
    toDate: { type: Date },
    company: { type: String },
    carType: { type: String },
    gear: { type: String },
    year: { type: Number },
    freeSearch: { type: String }
    }, {collection: 'searches'}
)

module.exports = mongoose.models.Search || mongoose.model('Search', searchSchema);