require("dotenv").config();
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

// Handling routes:
const studentRoutes = require("./routes/student.routes");
app.use("/students", studentRoutes);
const cohortRoutes = require("./routes/cohort.routes");
app.use("/cohorts", cohortRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
