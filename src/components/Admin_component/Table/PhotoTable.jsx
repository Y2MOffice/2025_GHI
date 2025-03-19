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
  Checkbox,
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
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // 체크박스 개별 선택 핸들러
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 전체 선택 핸들러 (isDeleted가 false인 데이터만 선택)
  const handleSelectAll = () => {
    const selectablePhotos = photos
      .filter((photo) => !photo.isDeleted)
      .map((p) => p.id);
    setSelected(
      selected.length === selectablePhotos.length ? [] : selectablePhotos
    );
  };

  // 부족한 행 추가 (테이블 높이 유지)
  const emptyRows = Math.max(MIN_ROWS - photos.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 &&
                  selected.length < photos.filter((p) => !p.isDeleted).length
                }
                checked={
                  selected.length > 0 &&
                  selected.length === photos.filter((p) => !p.isDeleted).length
                }
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell padding="none">
              {translations.phototable.artist}
            </TableCell>
            <TableCell padding="none">
              {translations.phototable.title}
            </TableCell>
            <TableCell padding="none">
              {translations.phototable.price}
            </TableCell>
            <TableCell padding="none">
              {translations.phototable.created_at}
            </TableCell>
            <TableCell padding="none">
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
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(photo.id)}
                  onChange={() => handleSelect(photo.id)}
                  disabled={photo.isDeleted}
                />
              </TableCell>
              <TableCell padding="none">
                {photo.artistName || "Unknown"}
              </TableCell>
              <TableCell padding="none">
                {truncateText(photo.title, isMobile ? 6 : 15)}
              </TableCell>
              <TableCell padding="none">{photo.price}</TableCell>
              <TableCell padding="none">
                {dayjs(photo.created_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none">
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
      <Button
        variant="contained"
        color="error"
        disabled={selected.length === 0}
        style={{ margin: "10px" }}
        onClick={() => console.log("선택된 데이터:", selected)}
      >
        {translations.managetable.delete}
      </Button>
    </TableContainer>
  );
};

export default PhotoTable;
