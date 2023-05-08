const mongoose = require("mongoose");

let receiptSchema = new mongoose.Schema({
    'location': {
        required: true,
        type: String
    },
    'when': {
        required: true,
        type: String
    },
    'subTotal': {
        required: true,
        type: String
    },
    'tax': {
        required: true,
        type: String
    },
    'tip': {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("receipts", receiptSchema)