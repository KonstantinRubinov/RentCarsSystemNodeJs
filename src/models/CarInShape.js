// models/CarInShape.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let carInShapeSchema = new Schema({
    name: { type: String },
    value: { type: String }
    }, {collection: 'carsInShape'}
)

module.exports = mongoose.models.CarInShape || mongoose.model('CarInShape', carInShapeSchema);