import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";

const CustomDateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={2}>
        {/* 시작 날짜 */}
        <DatePicker
          slotProps={{
            textField: {
              size: "small",
              sx: { width: "150px" },
            },
          }}
          format="YYYY-MM-DD"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          maxDate={endDate}
        />
        <span>_</span>
        {/* 종료 날짜  */}
        <DatePicker
          slotProps={{ textField: { size: "small", sx: { width: "150px" } } }}
          format="YYYY-MM-DD"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          minDate={startDate}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
