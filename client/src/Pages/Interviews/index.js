import React, { useEffect, useState } from "react";
import {
  FetchApplicationTests,
  FetchInterviews,
  DeleteApplicationTest,
  DeleteInterview,
} from "../../api";
import { CircularProgress, Button, Box } from "@mui/material";
import AddApplicationTestForm from "../../component/Interview-and-test/AddApplicationTestForm";
import AddInterviewForm from "../../component/Interview-and-test/AddInterviewForm";
import EditApplicationTestForm from "../../component/Interview-and-test/EditApplicationTestForm";
import DataTable from "../../component/DataTable";

const Interviews = () => {
  const [application_tests, setApplicationTests] = useState(null);
  const [interviews, setInterviews] = useState(null);

  const [editApplicationTestData, setEditApplicationTestData] = useState(null);
  const fetchApplicationTests = async () => {
    try {
      const { data } = await FetchApplicationTests();
      setApplicationTests(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchInterviews = async () => {
    try {
      const { data } = await FetchInterviews();
      setInterviews(data);
      //   console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const [deleteLoader, setDeleteLoader] = useState(false);
  const [editLoader, setEditLoader] = useState(false);

  let interviews_columns = [
    { label: "ID", id: "Id" },
    { label: "Application ID", id: "application_id" },
    { label: "Start Time", id: "start_time" },
    { label: "Ending Time", id: "end_time" },
  ];

  let applicationTests_columns = [
    { label: "ID", id: "Id" },
    { label: "Application ID", id: "application_id" },
    { label: "Start Time", id: "start_time" },
    { label: "Ending Time", id: "end_time" },
    { label: "Score", id: "score" },
  ];

  useEffect(() => {
    fetchApplicationTests();
    fetchInterviews();
  }, []);

  const [openApplicationTestForm, setOpenApplicationTestForm] = useState(false);
  const [openEditApplicationTestForm, setOpenEditApplicationTestForm] =
    useState(false);
  const [openInterviewForm, setOpenInterviewForm] = useState(false);
  const [openEditInterviewForm, setOpenEditInterviewForm] = useState(false);
  return (
    <Box component={'main'} sx={{ p:7 }}>
      {application_tests ? (
        <div className="container">
          <div className="table-container">
            <div className="table-header">
              <h3>List of Job Application Tests</h3>
              <div className="table-header-button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenApplicationTestForm(true)}
                >
                  Add Application Test
                </Button>
              </div>
            </div>
            <DataTable
              columns={applicationTests_columns}
              rows={application_tests}
              deleteMethod={DeleteApplicationTest}
              nextMethod={fetchApplicationTests}
              openEditForm={openEditApplicationTestForm}
              setOpenEditForm={setOpenEditApplicationTestForm}
            />
          </div>
          <AddApplicationTestForm
            open={openApplicationTestForm}
            setOpen={setOpenApplicationTestForm}
          />
        </div>
      ) : (
        <CircularProgress size={24} color="primary" />
      )}
      {interviews ? (
        <div className="conatiner">
          <div className="table-container">
            <div className="table-header">
              <h3>List of Interviews</h3>
              <div className="table-header-button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenInterviewForm(true)}
                >
                  Add Interviews
                </Button>
              </div>
            </div>

            <DataTable
              columns={interviews_columns}
              rows={interviews}
              deleteMethod={DeleteInterview}
              nextMethod={fetchInterviews}
              openEditForm={openEditApplicationTestForm}
              setOpenEditForm={setOpenEditApplicationTestForm}
            >
              <EditApplicationTestForm />
            </DataTable>
          </div>
          <AddInterviewForm
            open={openInterviewForm}
            setOpen={setOpenInterviewForm}
          />
          {/* {editApplicationTestData && (
            <EditApplicationTestForm
              open={openEditApplicationTestForm}
              setOpen={setOpenEditApplicationTestForm}
              data={editApplicationTestData}
              nextMethod={fetchApplicationTests}
            />
          )} */}
        </div>
      ) : (
        <CircularProgress size={108} color="primary" />
      )}
    </Box>
  );
};

export default Interviews;
