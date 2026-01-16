const router = require("express").Router();
const UserModel = require("../models/User.model");

const StudentModel = require("../models/Student.model");

// STUDENTS ROUTES
// Route to create a student WORKING!!!
router.post("/create", (req, res) => {
  StudentModel.create(req.body)
  .then((data) => {
    console.log("student added", data);
    res.status(201).json(data);
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    })
});

// Route to find all students WORKING!!!
router.get("/all", async (req, res) => {
  try {
    const data = await StudentModel.find().populate("cohort");
    console.log("students found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Route to retrieve a specific student by id WORKING!!!
router.get("/:studentId", async (req, res) => {
  try {
    const foundOneStudent = await StudentModel.findById(req.params.studentId).populate(
      "cohort"
    );
    console.log("student found", foundOneStudent);
    res.status(200).json(foundOneStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Route to retrieve all of the students for a given cohort WORKING!!!
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const data = await StudentModel.find({ cohort: req.params.cohortId }).populate("cohort");
    console.log("students found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//Route to Update a specific student by id WORKING!!!
router.put("/:studentId", (req, res) => {
  const { studentId } = req.params;
  StudentModel.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("students updated", updatedStudent);
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//Route to delete a specific student by id WORKING!!!
router.delete("/:studentId", (req, res) => {
  StudentModel.findByIdAndDelete(req.params.studentId)
    .then((data) => {
      console.log("students deleted", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

module.exports = router;