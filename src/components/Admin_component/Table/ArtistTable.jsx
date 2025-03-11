import React, { useState, useEffect, useContext } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const MIN_ROWS = 10; // 최소 표시할 행 개수

const ArtistTable = ({ artists, loading, error }) => {
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
  const emptyRows = Math.max(MIN_ROWS - artists.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox" sx={{ px: 1 }}>
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < artists.length
                }
                checked={selected.length === artists.length}
                onChange={() =>
                  setSelected(
                    selected.length === artists.length
                      ? []
                      : artists.map((a) => a.id)
                  )
                }
              />
            </TableCell>
            <TableCell>{translations.artisttable.name}</TableCell>
            <TableCell>{translations.artisttable.hashtag}</TableCell>
            <TableCell>{translations.artisttable.created_at}</TableCell>
            <TableCell>{translations.artisttable.updated_at}</TableCell>
            <TableCell>{translations.usertable.state}</TableCell>
            <TableCell>{translations.artisttable.manage}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                {translations.artisttable.loading}
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={7} align="center" style={{ color: "red" }}>
                {translations.artisttable.error}: {error}
              </TableCell>
            </TableRow>
          ) : (
            artists.map((artist) => (
              <TableRow key={artist.id} sx={{ height: "40px" }}>
                <TableCell padding="checkbox" sx={{ px: 1 }}>
                  <Checkbox
                    checked={selected.includes(artist.id)}
                    onChange={() => handleSelect(artist.id)}
                  />
                </TableCell>
                <TableCell>{artist.name}</TableCell>
                <TableCell>{artist.hashtags.length > 0 ? artist.hashtags.join(", ") : "-"}</TableCell>
                <TableCell>{dayjs(artist.startDate).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{dayjs(artist.endDate).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{artist.isDeleted ? "Inactive" : "Active"}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/admin/artistsedit/${artist.id}`)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}

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

export default ArtistTable;
