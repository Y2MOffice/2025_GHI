import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
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
import { apiRequest } from "../../utils/api";

const PhotoCollectionModal = ({ open, onClose, onSelect }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [photoCollections, setPhotoCollections] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
    const { translations } = useContext(LanguageContext);

  const handleSearch = async () => {
    try {
      const response = await apiRequest(
        `/photo-collections?title=${searchTitle}`
      );

      setPhotoCollections(response.data.items);
      
    } catch (error) {
      console.error("error:", error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {translations.photomodal.title}
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
          label={translations.photomodal.search}
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
        {translations.photomodal.searchbutton}
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translations.photomodal.titletable}</TableCell>
                <TableCell>{translations.photomodal.select}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {photoCollections
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((collection) => (
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
                        {translations.photomodal.select}
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
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default PhotoCollectionModal;
