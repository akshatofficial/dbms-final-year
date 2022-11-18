import React, { useEffect, useState } from "react";
import {
  FetchJobs,
  FetchJobsCategory,
  FetchJobsPosition,
  FetchOrganization,
} from "../../api";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Button, Grid, Box } from "@mui/material";
import "./style.css";
import AddJobFormDialog from "../../component/AddJobForm";
import DataTable from "../../component/DataTable";

const Jobs = () => {
  const [jobs, setJobs] = useState(null);
  const [jobsCategory, setJobsCategory] = useState(null);
  const [jobsPosition, setJobsPosition] = useState(null);
  const [organizations, setOrganizations] = useState(null);

  let jobsCategory_columns = [
    { title: "ID", field: "Id", flex: 1, align: "center" },
    { title: "NAME", field: "name", flex: 1, align: "center" },
  ];

  let jobsPosition_columns = [
    { title: "ID", field: "Id", flex: 1, align: "center" },
    { title: "NAME", field: "name", flex: 1, align: "center" },
  ];

  let organization_columns = [
    { title: "ID", field: "Id", flex: 1, align: "center" },
    { title: "NAME", field: "name", flex: 1, align: "center" },
  ];

  const fetchJobs = async () => {
    try {
      const { data } = await FetchJobs();
      setJobs(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchJobsCategory = async () => {
    try {
      const { data } = await FetchJobsCategory();
      setJobsCategory(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchJobsPosition = async () => {
    try {
      const { data } = await FetchJobsPosition();
      setJobsPosition(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrganization = async () => {
    try {
      const { data } = await FetchOrganization();
      setOrganizations(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchJobsCategory();
    fetchJobsPosition();
    fetchOrganization();
  }, []);

  const [openJobForm, setOpenJobForm] = useState(false);

  const jobs_columns = [
    { label: "ID", id: "Id" },
    { label: "NAME", id: "name" },
    { label: "DESCRIPTION", id: "description" },
    { label: "DATE PUBLISHED", id: "date_published" },
    { label: "JOB START DATE", id: "job_start_date" },
    { label: "VACANCIES", id: "no_of_vacancies" },
    { label: "JOB CATEGORY", id: "job_category" },
    { label: "JOB POSITION", id: "job_position" },
    { label: "ORAGNIZATION", id: "organization" },
    { label: "PROCESS ID", id: "process_id" },
  ];

  return (
    <Box component={'main'} sx={{ p:7 }}>
      {jobs ? (
        <div className="container">
          <div className="table-container">
            <div className="table-header">
              <h3>Listed Jobs</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenJobForm(true)}
              >
                Add Job
              </Button>
            </div>
            <DataTable
              columns={jobs_columns}
              rows={jobs}
              nextMethod={fetchJobs}
              // deleteMethod={DeleteApplicationTest}
              // nextMethod={fetchApplicationTests}
              // openEditForm={openEditApplicationTestForm}
              // setOpenEditForm={setOpenEditApplicationTestForm}
            />
          </div>
          <AddJobFormDialog open={openJobForm} setOpen={setOpenJobForm} />
        </div>
      ) : (
        <CircularProgress size={24} color="primary" />
      )}
      <br />
      <br />
      <br />
      <Grid container spacing={2} sx={{ height: 400, padding: 2 }}>
        {jobsCategory ? (
          <Grid item md={4}>
            <h3>Jobs category</h3>
            <DataGrid
              rows={jobsCategory}
              headerHeight={40}
              columns={jobsCategory_columns}
              pageSize={5}
              getRowId={(row) => row.Id}
            />
          </Grid>
        ) : (
          <CircularProgress size={24} color="primary" />
        )}
        {jobsPosition ? (
          <Grid item md={4}>
            <h3>Jobs position</h3>
            <DataGrid
              rows={jobsPosition}
              headerHeight={40}
              columns={jobsPosition_columns}
              pageSize={5}
              getRowId={(row) => row.Id}
            />
          </Grid>
        ) : (
          <CircularProgress size={24} color="primary" />
        )}
        {organizations ? (
          <Grid item md={4}>
            <h3>Organizations</h3>
            <DataGrid
              rows={organizations}
              headerHeight={40}
              columns={organization_columns}
              pageSize={5}
              getRowId={(row) => row.Id}
            />
          </Grid>
        ) : (
          <CircularProgress size={24} color="primary" />
        )}
      </Grid>
    </Box>
  );
};

export default Jobs;
