// models/Role.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let roleSchema = new Schema({
    userLevel: { type: Number, required: true, unique: true },
    userRole: { type: String, required: true, unique: true }
    }, {collection: 'roles'}
)

roleSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema);