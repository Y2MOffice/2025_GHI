import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

dayjs.extend(utc);

const SearchArtistArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [searchParams, setSearchParams] = useState({
    name: "",
    hashtag: "",
    startDate: "",
    endDate: "",
    isDeleted: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = { ...searchParams };

    if (params.startDate) {
      params.startDate = dayjs(params.startDate)
        .utc()
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
    }

    if (params.endDate) {
      params.endDate = dayjs(params.endDate)
        .utc()
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
    }

    onSearch(params);
  };

  return (
    <Box
      sx={{
        p: 1,
        border: "1px solid #ccc",
        borderRadius: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 0 }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          {translations.adminpage.searchCondition}
        </Typography>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}
      >
        <Collapse in={open}>
          <TextField
            label={translations.artisttable.name}
            name="name"
            value={searchParams.name}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label={translations.artisttable.hashtag}
            name="hashtag"
            value={searchParams.hashtag}
            onChange={handleChange}
            size="small"
          />
          <Select
            name="isDeleted"
            value={searchParams.isDeleted}
            onChange={handleChange}
            size="small"
            displayEmpty
          >
            <MenuItem value="">{translations.managetable.state}</MenuItem>
            <MenuItem value="true">Inactive</MenuItem>
            <MenuItem value="false">Active</MenuItem>
          </Select>
          <TextField
            label={translations.artisttable.date}
            name="startDate"
            type="date"
            value={searchParams.startDate}
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          ~
          <TextField
            label={translations.artisttable.date}
            name="endDate"
            type="date"
            value={searchParams.endDate}
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            {translations.artisttable.search}
          </Button>
        </Collapse>
      </Box>
    </Box>
  );
};

export default SearchArtistArea;
