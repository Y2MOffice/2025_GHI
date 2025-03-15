import React, { useState, useEffect, useContext } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const MIN_ROWS = 10; // 최소 표시할 행 개수

const ArtistTable = ({
  artists,
  loading,
  error,
  onSortChange,
  orderBy,
  ascending,
}) => {
  const { translations } = useContext(LanguageContext);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  // 체크박스 선택 핸들러
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && ascending;
    onSortChange(property, !isAsc);
  };

  const handleDeleteArtist = async (artist) => {
    const token = sessionStorage.getItem("token");

    const confirmDelete = window.confirm(
      `${artist.name} ${translations.artisttable.delete_question}`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://stage-api.glowsnaps.tokyo/api/artists/${artist.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`deleteFailed (ID: ${artist.id})`);
      }

      alert(`${artist.name} ${translations.artisttable.delete_success}`);
      window.location.reload(); // ✅ 삭제 후 목록 새로고침
    } catch (err) {
      alert(`${translations.artisttable.delete_failed}: ${err.message}`);
    }
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
            <TableCell>
               <TableSortLabel
                 active={orderBy === "name"}
                 direction={ascending ? "asc" : "desc"}
                 onClick={() => handleRequestSort("name")}
               >
                 {translations.artisttable.name}
               </TableSortLabel>
             </TableCell>
            <TableCell>{translations.artisttable.hashtag}</TableCell>
            <TableCell>
               <TableSortLabel
                 active={orderBy === "createdAt"}
                 direction={ascending ? "asc" : "desc"}
                 onClick={() => handleRequestSort("createdAt")}
               >
                 {translations.artisttable.created_at}
               </TableSortLabel>
             </TableCell>
             <TableCell>
               <TableSortLabel
                 active={orderBy === "isDeleted"}
                 direction={ascending ? "asc" : "desc"}
                 onClick={() => handleRequestSort("isDeleted")}
               >
                 {translations.usertable.state}
               </TableSortLabel>
             </TableCell>
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
                <TableCell>
                   {artist.hashtags.length > 0
                     ? artist.hashtags.join(", ")
                     : "-"}
                 </TableCell>
                 <TableCell>
                   {dayjs(artist.createdAt).format("YYYY-MM-DD")}
                 </TableCell>
                 <TableCell>
                   {artist.isDeleted ? "Inactive" : "Active"}
                 </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/admin/artistsedit/${artist.id}`)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                     color="error"
                     size="small"
                     onClick={() => handleDeleteArtist(artist)}
                   >
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
