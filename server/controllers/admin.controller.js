const asynHandler = require("express-async-handler")
const validator = require("validator")
const Subject = require("../models/Subject")
const Student = require("../models/Student")
const { checkEmpty } = require("../utils/checkEmpty")
const Mark = require("../models/Mark")

// Subject CRUD

exports.addSubject = asynHandler(async (req, res) => {
    const { name, total } = req.body
    const { error, isError } = checkEmpty({ name, total })
    if (isError) {
        res.status(400).json({ message: "all fields required", error })
    }
    await Subject.create({ name, total })
    res.json({ message: "Subject Create Success" })
})
exports.updateSubject = asynHandler(async (req, res) => {
    const { stubjectId } = req.params
    if (!validator.isMongoId(stubjectId)) {
        return res.status(400).json({ error: "Invalid Subject ID" })
    }
    await Subject.findByIdAndUpdate(stubjectId, req.body)
    res.json({ message: "Subject Update Success" })
})
exports.deleteSubject = asynHandler(async (req, res) => {
    const { stubjectId } = req.params
    if (!validator.isMongoId(stubjectId)) {
        return res.status(400).json({ error: "Invalid Subject ID" })
    }
    await Subject.findByIdAndDelete(stubjectId)
    res.json({ message: "Subject Delete Success" })
})
exports.getAllSubjects = asynHandler(async (req, res) => {
    const result = await Subject.find()
    res.json({ message: "All Subject Fetch Success", result })
})

// Student CRUD
exports.addStudent = asynHandler(async (req, res) => {
    const { first_name, last_name, dob, email } = req.body

    const { error, isError } = checkEmpty({ first_name, last_name, dob, email })
    if (isError) {
        res.status(400).json({ message: "all fields required", error })
    }

    if (!validator.isDate(dob)) {
        return res.status(400).json({ error: "Invalid Date" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid Email" })
    }
    await Student.create({ first_name, last_name, dob, email })
    res.json({ message: "Student Create Success" })
})
exports.updateStudent = asynHandler(async (req, res) => {
    const { studentId } = req.params
    if (!validator.isMongoId(studentId)) {
        return res.status(400).json({ error: "Invalid Student ID" })
    }
    const { dob, email } = req.body

    if (dob) {
        if (!validator.isDate(dob)) {
            return res.status(400).json({ error: "Invalid Date" })
        }
    }
    if (email) {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid Email" })
        }
    }

    await Student.findByIdAndUpdate(studentId, req.body)
    res.json({ message: "Student Update Success" })
})
exports.deleteStudent = asynHandler(async (req, res) => {
    const { stubjectId } = req.params
    if (!validator.isMongoId(stubjectId)) {
        return res.status(400).json({ error: "Invalid Student ID" })
    }
    await Student.findByIdAndDelete(stubjectId)
    res.json({ message: "Student Delete Success" })
})
exports.getAllStudents = asynHandler(async (req, res) => {
    // pagination goes here
    const result = await Student.find()
    res.json({ message: "All Student Fetch Success", result })
})



// Mark CRUD
exports.addMark = asynHandler(async (req, res) => {
    const { student, subject, score } = req.body
    const { error, isError } = checkEmpty({ student, subject, score })
    if (isError) {
        res.status(400).json({ message: "all fields required", error })
    }

    if (!validator.isMongoId(student)) {
        return res.status(400).json({ error: "invalid student id" })
    }
    if (!validator.isMongoId(subject)) {
        return res.status(400).json({ error: "invalid student id" })
    }
    await Mark.create({ student, subject, score })
    res.json({ message: "student mark add success" })
})

exports.updateMark = asynHandler(async (req, res) => {
    const { mid } = req.params
    if (!validator.isMongoId(mid)) {
        return res.status(400).json({ error: "invalid mark id" })
    }
    const data = {}
    const { subject, score } = req.body
    if (subject) {
        if (!validator.isMongoId(subject)) {
            return res.status(400).json({ error: "invalid subject id" })
        } else {
            data.subject = subject
        }
    }
    if (score) {
        data.score = score
    }
    await Mark.findByIdAndUpdate(mid, data)
    res.json({ message: "student mark update success" })
})

exports.deleteMark = asynHandler(async (req, res) => {
    const { mid } = req.params
    if (!validator.isMongoId(mid)) {
        return res.status(400).json({ error: "invalid mark id" })
    }
    await Mark.findByIdAndDelete(mid)
    res.json({ message: "student mark delete success" })
})

exports.getAllMarks = asynHandler(async (req, res) => {
    const { studentId } = req.params
    if (!validator.isMongoId(studentId)) {
        return res.status(400).json({ error: "invalid student id" })
    }
    const result = await Mark
        .find({ student: studentId })
        .populate("student")
        .populate("subject")
    res.json({ message: "student mark  fetch success", result })
})
