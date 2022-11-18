import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

const DateTimeInput = ({
  formData,
  setFormData,
  label,
  field,
  isEdit = false,
}) => {
  // console.log(formData, formData[field], field);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={isEdit ? formData[field].val : formData[field]}
        onChange={(value) => {
          // console.log(value.$d);
          isEdit
            ? setFormData({
                ...formData,
                [field]: { ...formData[field], val: value.$d },
              })
            : setFormData({ ...formData, [field]: value.$d });
        }}
        renderInput={(params) => (
          <TextField {...params} fullWidth label={label} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;
