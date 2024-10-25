const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
}, { timestamps: true })

module.exports = mongoose.model("student", studentSchema)