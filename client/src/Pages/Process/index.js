import React, { useState } from "react";
import { useEffect } from "react";
import { FetchProcessSteps, FetchSteps } from "../../api";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddProcessStepForm from "../../component/AddProcessStepForm";
import DataTable from "../../component/DataTable";

const Process = () => {
  const [processSteps, setProcessSteps] = useState(null);
  const [steps, setSteps] = useState(null);

  const fetchProcessSteps = async () => {
    try {
      const { data } = await FetchProcessSteps();
      setProcessSteps(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSteps = async () => {
    try {
      const { data } = await FetchSteps();
      setSteps(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  let processSteps_columns = [
    { label: "Id", id: "Id" },
    { label: "Process Id", id: "process_id" },
    { label: "Step Id", id: "step_id" },
    { label: "Status", id: "status" },
    { label: "Priority", id: "priority" },
  ];

  let steps_columns = [
    { label: "Id", id: "Id" },
    { label: "Name", id: "name" },
  ];

  useEffect(() => {
    fetchProcessSteps();
    fetchSteps();
  }, []);

  const [openProcessStepForm, setOpenProcessStepForm] = useState(false);

  return (
    <Box component={'main'} sx={{ p:7 }}>
      {processSteps ? (
        <div className="container">
          <div className="table-container">
            <div className="table-header">
              <h3>Process Steps</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenProcessStepForm(true)}
              >
                Add Process
              </Button>
            </div>
            <DataTable columns={processSteps_columns} rows={processSteps} />
          </div>
          <AddProcessStepForm
            open={openProcessStepForm}
            setOpen={setOpenProcessStepForm}
          />
        </div>
      ) : (
        <CircularProgress sz={24} color="primary" />
      )}
      {steps ? (
        <div style={{ margin: "auto" }}>
          <h3>Steps</h3>
          <div>
            <Grid container>
              <Grid item xs={6}>
                <DataTable rows={steps} columns={steps_columns} />
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <CircularProgress sz={24} color="primary" />
      )}
    </Box>
  );
};

export default Process;
