import axios from "axios";

const config = {
  "Access-Control-Allow-Origin": "",
  Allow: "GET",
};
const API = axios.create({ baseURL: "http://localhost:8000/" }, config);

export const FetchJobs = () => API.get("/jobs");
export const FetchJobsPosition = () => API.get("/jobs-position");
export const FetchJobsCategory = () => API.get("/jobs-category");
export const FetchOrganization = () => API.get("/organization");
export const AddJob = (formData) => API.post("/jobs", formData);

export const FetchProcessSteps = () => API.get("/process-steps");
export const CreateProcessSteps = (formData) =>
  API.post("/process-steps", formData);
export const FetchSteps = () => API.get("/steps");

export const FetchApplicants = () => API.get("/applicants");
export const AddApplicant = (formData) => API.post("/applicants", formData);
export const FetchApplications = () => API.get("/applications");
export const AddApplication = (formData) => API.post("/application", formData);

// Interviews and test APIs
export const FetchApplicationTests = () => API.get("/application-tests");
export const AddApplicationTest = (formData) =>
  API.post("application-tests", formData);
export const DeleteApplicationTest = (formData) =>
  API.delete("/application-tests", {
    data: formData,
  });
export const EditApplicationTest = (formData) =>
  API.put("/application-tests", formData);
export const FetchInterviews = () => API.get("/interviews");
export const AddInterview = (formData) => API.post("/interviews", formData);
export const DeleteInterview = (formData) =>
  API.delete("/interviews", {
    data: formData,
  });
export const EditInterview = (formData) => API.put("/interviews", formData);

export const buttonQueries = (query) =>
  API.get("/queries", { params: { queryPoint: query } });
