import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PhotoCollectionModal = ({ open, onClose, onSelect }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [photoCollections, setPhotoCollections] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearch = () => {
    const token = sessionStorage.getItem("token");
    fetch(`https://stage-api.glowsnaps.tokyo/api/photo-collections?title=${searchTitle}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.resultCode === 0) {
          setPhotoCollections(data.data.items);
        }
      })
      .catch((error) => console.error("사진집 검색 실패:", error));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        사진집 검색
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="사진집 제목 검색"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
          검색
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>제목</TableCell>
                <TableCell>선택</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {photoCollections.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>{collection.title}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        onSelect(collection.id, collection.title);
                        onClose();
                      }}
                    >
                      선택
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={photoCollections.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PhotoCollectionModal;
