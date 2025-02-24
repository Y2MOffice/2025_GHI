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

// 유저 데이터
const photoData = [
  {
    id: "0",
    artist_id: "0",
    title: "TWICE 1st Photobook: ONE IN A MILLION",
    description:
      "트와이스의 첫 번째 공식 사진집, 멤버들의 다양한 매력을 담았다.",
    cover_image_url: "https://example.com/twice_oneinamillion.jpg",
    price: "39.99",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "1",
    artist_id: "1",
    title: "BTS Memories 2023",
    description: "BTS의 2023년 활동을 기록한 사진집, 미공개 컷 포함.",
    cover_image_url: "https://example.com/bts_memories2023.jpg",
    price: "59.99",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "2",
    artist_id: "2",
    title: "NewJeans 1st Photobook: Attention",
    description: "뉴진스의 감각적인 스타일과 콘셉트가 돋보이는 첫 번째 사진집.",
    cover_image_url: "https://example.com/newjeans_attention.jpg",
    price: "42.50",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "3",
    artist_id: "3",
    title: "SEVENTEEN Going Seventeen",
    description: "세븐틴의 개성 넘치는 순간들을 담은 특별한 사진집.",
    cover_image_url: "https://example.com/seventeen_going.jpg",
    price: "45.00",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "4",
    artist_id: "4",
    title: "IVE The First Photobook: DIVE INTO IVE",
    description:
      "아이브의 데뷔 후 첫 공식 사진집, 멤버들의 다채로운 모습이 담겼다.",
    cover_image_url: "https://example.com/ive_diveintoive.jpg",
    price: "50.00",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
];

const artistData = [
  {
    id: "0",
    name: "트와이스",
  },
  {
    id: "1",
    name: "BTS",
  },
  {
    id: "2",
    name: "뉴진스",
  },
  {
    id: "3",
    name: "세븐틴",
  },
  {
    id: "4",
    name: "아이브",
  },
];

const MIN_ROWS = 10; // 최소 표시할 행 개수

const PhotoTable = () => {
  const { translations } = useContext(LanguageContext);
  const [photos, setphotos] = useState(photoData);
  const [artists, setartists] = useState(artistData);
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
          {photos.map((user) => (
            <TableRow key={user.id} sx={{ height: "40px" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </TableCell>
              <TableCell padding="none">
                {artists.find((artist) => artist.id === user.artist_id)
                  ?.name || "MissingName"}
              </TableCell>

              <TableCell padding="none">{user.title}</TableCell>
              <TableCell padding="none">{user.price}</TableCell>
              <TableCell padding="none">
                {dayjs(user.created_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none">
                {dayjs(user.updated_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => navigate("/admin/photosedit")}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton color="error" size="small">
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
