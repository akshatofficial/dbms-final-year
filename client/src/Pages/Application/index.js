import React, { useEffect, useState } from "react";
import { FetchApplicants, FetchApplications } from "../../api";
import { CircularProgress, Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddApplicantForm from "../../component/AddApplicantForm";
import AddApplicationsForm from "../../component/AddApplicationForm";
import DataTable from "../../component/DataTable";

const Application = () => {
  const [applicants, setApplicants] = useState(null);
  const [applications, setApplications] = useState(null);

  const fetchApplicants = async () => {
    try {
      const { data } = await FetchApplicants();
      setApplicants(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data } = await FetchApplications();
      setApplications(data);
      //   console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  let applicants_columns = [
    { headerName: "ID", field: "Id" },
    { headerName: "First Name", field: "first_name", flex: 1 },
    { headerName: "Last Name", field: "last_name", flex: 1 },
    { headerName: "Email", field: "email", flex: 1 },
    { headerName: "Phone", field: "phone", flex: 1 },
    { headerName: "Summary", field: "summary", flex: 1 },
    {
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <span style={{ display: "flex" }}>
          <Button variant="contained" color="primary">
            Edit
          </Button>
          <Button variant="contained" color="error">
            Del
          </Button>
        </span>
      ),
    },
  ];

  let applications_columns = [
    { headerName: "ID", field: "Id" },
    { headerName: "Application date", field: "date_of_application", flex: 1 },
    { headerName: "Education", field: "education", flex: 1 },
    { headerName: "Experince", field: "experince", flex: 1 },
    { headerName: "Documents Url", field: "documents_url", flex: 1 },
    { headerName: "Job Id", field: "job_id", flex: 1 },
    { headerName: "Applicant Id", field: "applicant_id", flex: 1 },
    {
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <span style={{ display: "flex" }}>
          <Button variant="contained" color="primary">
            Edit
          </Button>
          <Button variant="contained" color="error">
            Del
          </Button>
        </span>
      ),
    },
  ];

  const applicants_columns_test = [
    { label: "ID", id: "Id" },
    { label: "First Name", id: "first_name" },
    { label: "Last Name", id: "last_name" },
    { label: "Email", id: "email" },
    { label: "Phone", id: "phone" },
    { label: "Summary", id: "summary" },
  ];

  const applications_columns_test = [
    { label: "ID", id: "Id" },
    { label: "Application date", id: "date_of_application" },
    { label: "Education", id: "education" },
    { label: "Experince", id: "experince" },
    { label: "Documents Url", id: "documents_url" },
    { label: "Job Id", id: "job_id" },
    { label: "Applicant Id", id: "applicant_id" },
  ];

  useEffect(() => {
    fetchApplicants();
    fetchApplications();
  }, []);

  const [openApplicantsForm, setOpenApplicantsForm] = useState(false);
  const [openApplicationsForm, setOpenApplicationsForm] = useState(false);
  return (
    <Box component={'main'} sx={{ p:7 }}>
      {applicants ? (
        <div className="container">
          <div className="table-container">
            <div className="table-header">
              <h3>List of Job Applicants</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenApplicantsForm(true)}
              >
                Add Applicant
              </Button>
            </div>
            <DataTable columns={applicants_columns_test} rows={applicants} />
          </div>
          <AddApplicantForm
            open={openApplicantsForm}
            setOpen={setOpenApplicantsForm}
          />
        </div>
      ) : (
        <CircularProgress sz={24} color="primary" />
      )}
      {applications ? (
        <div className="conatiner">
          <div className="table-container">
            <div className="table-header">
              <h3>List of Job Applications</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenApplicationsForm(true)}
              >
                Add Application
              </Button>
            </div>
            <DataTable
              columns={applications_columns_test}
              rows={applications}
            />
          </div>
          <AddApplicationsForm
            open={openApplicationsForm}
            setOpen={setOpenApplicationsForm}
          />
        </div>
      ) : (
        <CircularProgress sz={24} color="primary" />
      )}
    </Box>
  );
};

export default Application;
