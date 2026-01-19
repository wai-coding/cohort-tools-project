const router = require("express").Router();
const UserModel = require("../models/User.model");

const CohortModel = require("../models/Cohort.model");

// COHORT ROUTES
// Route to create a cohort WORKING!!!
router.post("/", (req, res) => {
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

// Route to find all the cohorts WORKING!!!
router.get("/", async (req, res) => {
  try {
    const data = await CohortModel.find();
    console.log("cohorts found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Route to get one specific cohort by id WORKING!!
router.get("/:cohortId", async (req, res) => {
  try {
    const foundOneCohort = await CohortModel.findById(req.params.cohortId);
    console.log("cohort found", foundOneCohort);
    res.status(200).json(foundOneCohort);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Route to update one specific cohort by id WORKING!!!
router.put("/:cohortId", async (req, res) => {
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

// Route to delete one specific cohort by id WORKING!!!
router.delete("/:cohortId", async (req, res) => {
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

module.exports = router;