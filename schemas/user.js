const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    'firstName': {
        required: true,
        type: String
    },
    'lastName': {
        required: true,
        type: String
    },
    'email': { // primary key
        required: true,
        type: String
    },
    'ageTest': {
        required: true,
        type: String
    },
    'password': {
        required: true,
        type: String
    },
    'image': {
        required: false, 
        type: String
    }
})

module.exports = mongoose.model("users", userSchema)