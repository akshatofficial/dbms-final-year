import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";
import { CreateProcessSteps } from "../api";

const AddProcessStepForm = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    process_id: "",
    step_id: "",
    status: "",
    priority: "",
  });

  const handleClose = () => {
    setOpen(false);
    setFormData({
      process_id: "",
      step_id: "",
      status: "",
      priority: "",
    });
  };

  const handleAddProcessStep = async () => {
    // console.log(formData);
    setLoader(true);
    try {
      const { data } = await CreateProcessSteps(formData);
      console.log(data);
      setOpen(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  const [loader, setLoader] = useState(false);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add process Step</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="process_id"
            label="Process Id"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.process_id}
            onChange={(e) =>
              setFormData({ ...formData, process_id: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="step_id"
            label="Step Id"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.step_id}
            onChange={(e) =>
              setFormData({ ...formData, step_id: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="status"
            label="Status"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="priority"
            label="Priority"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleAddProcessStep}
            variant="contained"
            color="success"
          >
            {loader ? (
              <CircularProgress size={18} color="primary" />
            ) : (
              "Create Process Step"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProcessStepForm;
