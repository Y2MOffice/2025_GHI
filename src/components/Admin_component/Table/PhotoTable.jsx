import React, { useContext } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  useMediaQuery,
  TableSortLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";
import { LanguageContext } from "../../../contexts/LanguageContext";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const MIN_ROWS = 10;

const PhotoTable = ({ photos, onDelete, orderBy, ascending, onSortChange }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && ascending;
    onSortChange(property, !isAsc);
  };

  const emptyRows = Math.max(MIN_ROWS - photos.length, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{ overflow: "auto", maxWidth: "1800px", mx: "auto" }}
    >
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <TableSortLabel
                active={orderBy === "ArtistName"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("ArtistName")}
              >
                {translations.phototable.artist}
              </TableSortLabel>
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <TableSortLabel
                active={orderBy === "Title"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Title")}
              >
                {translations.phototable.title}
              </TableSortLabel>
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.phototable.price}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <TableSortLabel
                active={orderBy === "CreatedAt"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("CreatedAt")}
              >
                {translations.phototable.created_at}
              </TableSortLabel>
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.phototable.manage}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <TableSortLabel
                active={orderBy === "IsDeleted"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("IsDeleted")}
              >
                {translations.phototable.state || "dd"}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {photos.map((photo) => (
            <TableRow
              key={photo.id}
              sx={{
                height: "40px",
                backgroundColor: photo.isDeleted ? "#f0f0f0" : "inherit",
              }}
            >
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {photo.artistName || "Unknown"}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {truncateText(photo.title, isMobile ? 6 : 15)}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {photo.price}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {dayjs(photo.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/admin/photosedit/${photo.id}`)}
                  disabled={photo.isDeleted}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete(photo.id)}
                  disabled={photo.isDeleted}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                <Box
                  component="span"
                  sx={{
                    px: 1.2,
                    py: 0.2,
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    color: photo.isDeleted ? "error.main" : "success.main",
                    backgroundColor: photo.isDeleted ? "#ffe5e5" : "#e6f4ea",
                    display: "inline-block",
                    fontWeight: 500,
                  }}
                >
                  {photo.isDeleted ? "Inactive" : "Active"}
                </Box>
              </TableCell>
            </TableRow>
          ))}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} sx={{ height: "40px" }}>
              <TableCell colSpan={7} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PhotoTable;
