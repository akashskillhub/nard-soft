const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true
    },
    score: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("mark", markSchema)