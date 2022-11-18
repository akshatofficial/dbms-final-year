import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddApplication } from "../api";
import { CircularProgress } from "@mui/material";

export default function AddApplicationsForm({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
    setFormData({
      date_of_application: "",
      education: "",
      experince: "",
      document: "",
      documents_url: "",
      job_id: "",
      applicant_id: "",
    });
  };

  const [formData, setFormData] = useState({
    date_of_application: "",
    education: "",
    experince: "",
    document: "",
    documents_url: "",
    job_id: "",
    applicant_id: "",
  });

  const [loader, setLoader] = useState(false);
  const handleAddApplication = async () => {
    console.log(formData);
    setLoader(true);
    try {
      const { data } = await AddApplication(formData);
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
        <DialogTitle>Add Application</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="last_name"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone No."
            type="number"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="summary"
            label="Summary"
            type="text"
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleAddApplication}
            variant="contained"
            color="success"
          >
            {/* Create Job */}
            {loader ? (
              <CircularProgress size={18} color="primary" />
            ) : (
              "Create Application"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
