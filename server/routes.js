const express = require('express');
const ApplicationController = require('./controller/Application.controller');
const InterviewController = require('./controller/Interview.controller');
const JobsController = require('./controller/Jobs.controller');
const ProcessController = require('./controller/Process.controller');
const QueryController = require('./controller/Query.controller');
const router = express.Router();
const connection = require('./database');

router.get("/jobs", JobsController.getJobsHandler);
router.get("/jobs-category", JobsController.getJobCategoryhandler);
router.get("/jobs-position", JobsController.getJobPositionHandler);
router.get("/organization", JobsController.getOrganizationhandler);
router.post("/jobs", JobsController.addJobHandler);

router.get("/process-steps", ProcessController.getProcessStepshandler);
router.post("/process-steps", ProcessController.createProcessStepsHandler);
router.get("/steps", ProcessController.getSteps);

router.get("/applicants", ApplicationController.getApplicants);
router.post("/applicants", ApplicationController.createApplicant);
router.get("/applications", ApplicationController.getApplications);

router.get("/application-tests", InterviewController.getApplicationTestsHandler);
router.get("/interviews", InterviewController.getInterviewsHandler);
router.post("/application-tests", InterviewController.addApplicationTestHandler);
router.post("/interviews", InterviewController.addInterviewHandler);
router.delete("/application-tests", InterviewController.deleteApplicationTestHandler);
router.delete("/interviews", InterviewController.deleteInterviewHandler);

router.get("/queries", QueryController.getDataFromQuery);

module.exports = router;