const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// const students = require("./students.json");
// const cohorts = require("./cohorts.json");

//Imports models
const CohortModel = require("./models/Cohort.model");
const StudentModel = require("./models/Student.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Conects the DB
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => {
    console.log("Connected to the DB, Nice work!");
  })
  .catch((err) => console.log(err));

// COHORT ROUTES
// Route to create a cohort - WORKING!!!
app.post("/api/cohorts", (req, res) => {
  CohortModel.create(req.body)
  .then((data) => {
    console.log("cohort added", data);
    res.status(201).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  })
});

// Route to find all the cohorts - WORKING!!!
app.get("/api/cohorts", async (req, res) => {
  try {
    const data = await CohortModel.find();
    console.log("cohorts found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Route to get one specific cohort by id - WORKING!!!
app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const foundOneCohort = await CohortModel.findById(req.params.cohortId);
    console.log("cohort found", foundOneCohort);
    res.status(200).json(foundOneCohort);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Route to update one specific cohort by id - WORKING!!!
app.put("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  CohortModel.findByIdAndUpdate(cohortId, req.body, { new: true })
  .then((updatedCohort) => {
    console.log("cohorts updated", updatedCohort);
    res.status(200).json(updatedCohort)
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

// Route to delete one specific cohort by id - WORKING!!!
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  CohortModel.findByIdAndDelete(req.params.cohortId)
  .then((data) => {
    console.log("cohorts deleted", data);
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ errorMessage: err });
    });
});

// STUDENTS ROUTES
// Route to create a student - WORKING!!!
app.post("/api/students", (req, res) => {
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
app.get("/api/students", async (req, res) => {
  try {
    const data = await StudentModel.find().populate("cohort");
    console.log("students found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Route to retrieve a specific student by id - WORKING!!!
app.get("/api/students/:studentId", async (req, res) => {
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

// Route to retrieve all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const data = await StudentModel.find({ cohort: req.params.cohortId }).populate("cohort");
    console.log("students found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// router.get("/one-pet/:id", async (req, res) => {
//   try {
//     const foundPetById = await PetModel.findById(req.params.id).populate(
//       "owner",
//       "username profilePicture"
//     );
//     res.status(200).json(foundPetById);
//   } catch (err) {
//     res.status(500).json({ errorMessage: err });
//   }
// });

//Route to Update a specific student by id - WORKING!!!
app.put("/api/students/:studentId", (req, res) => {
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

//Route to delete a specific student by id - WORKING!!!
app.delete("/api/students/:studentId", (req, res) => {
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




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
