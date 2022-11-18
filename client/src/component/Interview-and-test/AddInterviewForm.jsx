import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddInterview } from "../../api";
import { CircularProgress } from "@mui/material";
import DateTimeInput from "../DateTimeInput";
import dayjs from "dayjs";

export default function AddInterviewForm({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
    setFormData({
      start_time: dayjs(new Date().toISOString()).$d,
      end_time: dayjs(new Date().toISOString()).$d,
      application_id: "",
    });
  };

  const [formData, setFormData] = useState({
    start_time: dayjs(new Date().toISOString()).$d,
    end_time: dayjs(new Date().toISOString()).$d,
    application_id: "",
  });

  const [loader, setLoader] = useState(false);
  const handleAddInterview = async () => {
    console.log(formData);
    setLoader(true);
    try {
      const { data } = await AddInterview(formData);
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
        <DialogTitle>Add Interview</DialogTitle>
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
            label="Start Time"
            field="start_time"
          />
          <DateTimeInput
            formData={formData}
            setFormData={setFormData}
            label="Finish Time"
            field="finish_time"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleAddInterview}
            variant="contained"
            color="success"
          >
            {/* Create Job */}
            {loader ? (
              <CircularProgress size={18} color="primary" />
            ) : (
              "Create Interview"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
