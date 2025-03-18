import React, { useState, useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableSortLabel,
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
import { apiRequest } from "../../../utils/api";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const MIN_ROWS = 10; // 최소 표시할 행 개수

const PhotoTable = ({ photos, loading, error, onDelete }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { translations } = useContext(LanguageContext);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // 체크박스 선택 핸들러
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 빈 행 추가 (테이블 높이를 유지하려고)
  const emptyRows = Math.max(MIN_ROWS - photos.length, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{ overflow: "auto" }} // 스크롤 가능
    >
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < photos.length
                }
                checked={selected.length === photos.length}
                onChange={() =>
                  setSelected(
                    selected.length === photos.length
                      ? []
                      : photos.map((u) => u.id)
                  )
                }
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
              {translations.phototable.updated_at}
            </TableCell>
            <TableCell padding="none">
              {translations.phototable.manage}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {photos.map((photo) => (
            <TableRow key={photo.id} sx={{ height: "40px" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(photo.id)}
                  onChange={() => handleSelect(photo.id)}
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
                {dayjs(photo.updated_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => navigate("/admin/photosedit")}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete(photo.id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {/* 부족한 행을 빈 행으로 채움 */}
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
      >
        {translations.managetable.delete}
      </Button>
    </TableContainer>
  );
};

export default PhotoTable;
