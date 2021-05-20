// models/Message.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let messageSchema = new Schema({
    messageID: { type: Number, unique: true },
    userID: { type: String },
    userFirstName: { type: String },
    userLastName: { type: String },
    userEmail: { type: String },
    userMessage: { type: String }
    }, {collection: 'messages'}
)

messageSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);