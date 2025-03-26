import React, { useState, useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const MIN_ROWS = 10;

const PhotoTable = ({ photos, onDelete }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  // 부족한 행 추가 (테이블 높이 유지)
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
              {translations.phototable.artist}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.phototable.title}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.phototable.price}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.phototable.created_at}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.phototable.manage}
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
                ${photo.price}
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
