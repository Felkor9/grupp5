const mongoose = require("mongoose");

const RecensionSchema = new mongoose.Schema({
    namn: {
        type: String,
        required: true,
    },
    datum: {
        type: Date,
        required: true,
    },
    recensioner: {
        type: Array,
        required: true
    },

});

module.exports =  mongoose.model("author", RecensionSchema)
