const adminController = require("./../controllers/admin.controller")

const router = require("express").Router()

router
    .post("/subject-create", adminController.getAllSubjects)
    .put("/subject-update/:stubjectId", adminController.updateSubject)
    .delete("/subject-remove/:stubjectId", adminController.deleteSubject)
    .get("/subject", adminController.getAllSubjects)

    .post("/student-create", adminController.getAllStudents)
    .put("/student-update/:studentId", adminController.updateStudent)
    .delete("/student-remove/:studentId", adminController.deleteStudent)
    .get("/student", adminController.getAllStudents)

    .post("/mark-create", adminController.getAllMarks)
    .put("/mark-update/:mid", adminController.updateMark)
    .delete("/mark-remove/:mid", adminController.deleteMark)
    .get("/mark", adminController.getAllMarks)

module.exports = router
