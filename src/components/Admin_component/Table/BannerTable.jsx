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

const MIN_ROWS = 10;

const BannerTable = ({
  banners,
  loading,
  error,
  onBannerDeleted,
  onSortChange,
  orderBy,
  ascending,
}) => {
  const { translations } = useContext(LanguageContext);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && ascending;
    onSortChange(property, !isAsc);
  };

  const handleDeleteBanner = async (banner) => {
    const token = sessionStorage.getItem("token");

    const confirmDelete = window.confirm(
      `${banner.title} ${translations.bannertable.deletequestion}`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://stage-api.glowsnaps.tokyo/api/banners/${banner.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`failed (ID: ${banner.id})`);
      }

      alert(`${banner.title} ${translations.bannertable.deletesuccess}`);
      onBannerDeleted();
    } catch (err) {
      alert(`${translations.bannertable.deletefailed}: ${err.message}`);
    }
  };

  const emptyRows = Math.max(MIN_ROWS - banners.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto", width: "100%" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox" sx={{ px: 1 }}>
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < banners.length
                }
                checked={selected.length === banners.length}
                onChange={() =>
                  setSelected(
                    selected.length === banners.length
                      ? []
                      : banners.map((u) => u.id)
                  )
                }
              />
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "title"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("title")}
              >
                {translations.bannertable.title}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "description"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("description")}
              >
                {translations.bannertable.description}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "photoCollectionTitle"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("photoCollectionTitle")}
              >
                {translations.bannertable.photoCollectionTitle}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "displayOrder"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("displayOrder")}
              >
                {translations.bannertable.displayOrder}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "isDeleted"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("isDeleted")}
              >
                {translations.bannertable.state}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "isActive"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("isActive")}
              >
                {translations.bannertable.isActive}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "displayStartDate"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("displayStartDate")}
              >
                {translations.bannertable.displayStartDate}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "displayEndDate"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("displayEndDate")}
              >
                {translations.bannertable.displayEndDate}
              </TableSortLabel>
            </TableCell>
            <TableCell>{translations.bannertable.manage}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                {translations.bannertable.loading}
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={9} align="center" style={{ color: "red" }}>
                {translations.bannertable.error}: {error}
              </TableCell>
            </TableRow>
          ) : (
            banners.map((banner) => (
              <TableRow key={banner.id} sx={{ height: "40px" }}>
                <TableCell padding="checkbox" sx={{ px: 1 }}>
                  <Checkbox
                    checked={selected.includes(banner.id)}
                    onChange={() => handleSelect(banner.id)}
                  />
                </TableCell>
                <TableCell>{banner.title}</TableCell>
                <TableCell>{banner.description}</TableCell>
                <TableCell>{banner.photoCollectionTitle}</TableCell>
                <TableCell>{banner.displayOrder}</TableCell>
                <TableCell>
                  {banner.isDeleted ? "Inactive" : "Active"}
                </TableCell>
                <TableCell>{banner.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  {dayjs(banner.displayStartDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {dayjs(banner.displayEndDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/admin/bannersedit/${banner.id}`)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDeleteBanner(banner)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}

          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} sx={{ height: "40px" }}>
              <TableCell colSpan={9} />
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

export default BannerTable;
