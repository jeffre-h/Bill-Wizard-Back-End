const mongoose = require("mongoose");

let receiptSchema = new mongoose.Schema({
    'location': {
        required: true,
        type: String
    },
    'when': {
        required: false,
        type: String
    },
    'subTotal': {
        required: true,
        type: String
    },
    'tax': {
        required: false,
        type: String
    },
    'tip': {
        required: false,
        type: String
    },
    'payerEmail': { 
        required: true,
        type: String
    },
    'split': {
        required: true,
        type: Boolean
    },
    'image': {
        required: false, 
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("receipts", receiptSchema)