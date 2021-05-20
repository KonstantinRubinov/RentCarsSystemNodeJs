// models/OrderPrice.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderPriceSchema = new Schema({
    carNumber: { type: String, required: true },
    rentStartDate: { type: Date },
    rentEndDate: { type: Date },
    carPrice: { type: Number },
    orderDays: { type: Number }
    }, {collection: 'orderPrices'}
)

module.exports = mongoose.models.OrderPrice || mongoose.model('OrderPrice', orderPriceSchema);