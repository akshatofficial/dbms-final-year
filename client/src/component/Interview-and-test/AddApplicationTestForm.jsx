import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddApplicationTest } from "../../api";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import DateTimeInput from "../DateTimeInput";

export default function AddApplicationTestForm({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
    setFormData({
      start_time: dayjs(new Date().toLocaleString()),
      finish_time: dayjs(new Date().toLocaleString()),
      score: "",
      application_id: "",
    });
  };

  const [formData, setFormData] = useState({
    start_time: dayjs(new Date().toLocaleString()),
    finish_time: dayjs(new Date().toLocaleString()),
    score: "",
    application_id: "",
  });

  const [loader, setLoader] = useState(false);
  const handleAddApplicationTest = async () => {
    console.log(formData);
    setLoader(true);
    try {
      const { data } = await AddApplicationTest(formData);
      console.log(data);
      setOpen(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Applicant</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="application_id"
            label="Application Id"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.application_id}
            onChange={(e) =>
              setFormData({ ...formData, application_id: e.target.value })
            }
          />
          <DateTimeInput
            formData={formData}
            setFormData={setFormData}
            field={"start_time"}
            label={"Start Time"}
          />
          <DateTimeInput
            formData={formData}
            setFormData={setFormData}
            field={"finish_time"}
            label={"Finish Time"}
          />
          <TextField
            autoFocus
            margin="dense"
            id="score"
            label="Score"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.score}
            onChange={(e) =>
              setFormData({ ...formData, score: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleAddApplicationTest}
            variant="contained"
            color="success"
          >
            {/* Create Job */}
            {loader ? (
              <CircularProgress size={18} color="primary" />
            ) : (
              "Create Application Test"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
