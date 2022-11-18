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

export default function EditApplicationTestForm({
  open,
  setOpen,
  data,
  nextMethod,
}) {
    console.log(data);
  const handleClose = () => {
    setOpen(false);
    // setFormData(null);
  };

  const [formData, setFormData] = useState({
    start_time: { type: "date", val: dayjs(data.start_time).$d },
    finish_time: { type: "date", val: dayjs(data.finish_time).$d },
    score: { type: "int", val: data.score },
    application_id: { type: "int", val: data.application_id },
  });

  const [loader, setLoader] = useState(false);

  const handleAddApplicationTest = async () => {
    let data_to_send = {};

    Object.keys(formData).forEach((key) => {
      if (String(formData[key].val) !== String(data[key])) {
        data_to_send = {
          ...data_to_send,
          [key]: { type: formData[key].type, val: formData[key].val },
        };
      }
    });

    console.log(formData, data_to_send);

    nextMethod();
    // setLoader(true);
    // try {
    //   const { data } = await AddApplicationTest(formData);
    //   console.log(data);
    //   setOpen(false);
    //   window.location.reload();
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   setLoader(false);
    // }
  };

  console.log(formData);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Application Test</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="application_id"
            label="Application Id"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.application_id.val}
            onChange={(e) =>
              setFormData({
                ...formData,
                application_id: {
                  ...formData.application_id,
                  val: e.target.value,
                },
              })
            }
          />
          <DateTimeInput
            formData={formData}
            setFormData={setFormData}
            field={"start_time"}
            label={"Start Time"}
            isEdit={true}
          />
          <DateTimeInput
            formData={formData}
            setFormData={setFormData}
            field={"finish_time"}
            label={"Finish Time"}
            isEdit={true}
          />
          <TextField
            autoFocus
            margin="dense"
            id="score"
            label="Score"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.score.val}
            onChange={(e) =>
              setFormData({
                ...formData,
                score: { ...formData.score, val: e.target.value },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            // disabled={loader}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddApplicationTest}
            variant="contained"
            color="success"
            disabled={loader}
          >
            {/* Create Job */}
            {loader ? (
              <CircularProgress size={18} color="primary" />
            ) : (
              "Edit Application Test"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
