import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ pagination, setPagination }) => {
  const handleChange = (event, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  return (
    <Pagination
      count={pagination.totalPages}
      page={pagination.page}
      onChange={handleChange}
      color="primary"
      shape="rounded"
    />
  );
};

export default PaginationComponent;
