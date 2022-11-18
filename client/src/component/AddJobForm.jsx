import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddJob } from "../api";
import { CircularProgress } from "@mui/material";

export default function AddJobFormDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      description: "",
      date_published: "",
      job_start_date: "",
      no_of_vacancies: "",
      job_category_id: "",
      job_position_id: "",
      organization_id: "",
      process_id: "",
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date_published: "",
    job_start_date: "",
    no_of_vacancies: "",
    job_category_id: "",
    job_position_id: "",
    organization_id: "",
    process_id: "",
  });

  const [loader, setLoader] = useState(false);
  const handleAddJob = async () => {
    console.log(formData);
    setLoader(true);
    try {
      const { data } = await AddJob(formData);
      console.log(data);
      setOpen(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Job</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="date_published"
            label="Date Published"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.date_published}
            onChange={(e) =>
              setFormData({ ...formData, date_published: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="job_start_date"
            label="Job Start Date"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.job_start_date}
            onChange={(e) =>
              setFormData({ ...formData, job_start_date: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="vacancies"
            label="Vacancies"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.no_of_vacancies}
            onChange={(e) =>
              setFormData({ ...formData, no_of_vacancies: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="job_category_id"
            label="Job Category Id"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.job_category_id}
            onChange={(e) =>
              setFormData({ ...formData, job_category_id: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="job_position_id"
            label="Job Position Id"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.job_position_id}
            onChange={(e) =>
              setFormData({ ...formData, job_position_id: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="organization_id"
            label="Organization Id"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.organization_id}
            onChange={(e) =>
              setFormData({ ...formData, organization_id: e.target.value })
            }
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={handleAddJob} variant="contained" color="success">
            {/* Create Job */}
            {loader ? (
              <CircularProgress size={18} color="primary" />
            ) : (
              "Create Job"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
