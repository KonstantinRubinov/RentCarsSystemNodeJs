// models/CarPicture.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let carPictureSchema = new Schema({
    carPictureLink: { type: String },
    carPictureName: { type: String },
    numberOfCars: { type: Number }
    }, {collection: 'carPictures'}
)

module.exports = mongoose.models.CarPicture || mongoose.model('CarPicture', carPictureSchema);