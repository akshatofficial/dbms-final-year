import { Button, Paper, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import DateTimeInput from "../../../component/DateTimeInput";

const Update = () => {
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    setEditData(JSON.parse(localStorage.getItem("EditData")));
    console.log(editData);
  }, [editData]);

  const [formData, setFormData] = useState({
    start_time: { type: "date", val: dayjs(editData?.start_time).$d },
    finish_time: { type: "date", val: dayjs(editData?.finish_time).$d },
    score: { type: "int", val: editData?.score },
    application_id: { type: "int", val: editData?.application_id },
  });

  const [loader, setLoader] = useState(false);
  const handleSubmit = async () => {
    let data_to_send = {};

    Object.keys(formData).forEach((key) => {
      if (String(formData[key].val) !== String(editData[key])) {
        data_to_send = {
          ...data_to_send,
          [key]: { type: formData[key].type, val: formData[key].val },
        };
      }
    });

    console.log(formData, data_to_send);
  };

  return (
    <div>
      <Paper elevation={10}>
        {editData && (
          <div className="container">
            <Typography component="h1" variant="h5">
              Edit Application Test
            </Typography>
            <form onSubmit={handleSubmit}>
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
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </form>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Update;
