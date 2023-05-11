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
    'profilePic': {
        required: false,
        data: Buffer,           // stores the image 
        contentType: String     // stores the type of file (jpg, png, etc.)
    }  
})

module.exports = mongoose.model("users", userSchema)