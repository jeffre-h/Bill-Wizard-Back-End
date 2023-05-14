const mongoose = require("mongoose");

let friendshipSchema = new mongoose.Schema({
    'friend1': {
        required: true,
        type: String
    },
    'friend2': {
        required: true,
        type: String
    },
})

module.exports = mongoose.model("friendships", friendshipSchema)