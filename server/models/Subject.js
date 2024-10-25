const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("subject", subjectSchema)