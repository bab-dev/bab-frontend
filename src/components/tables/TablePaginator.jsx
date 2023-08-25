import React from "react";
import PropTypes from "prop-types";

import { Box, TablePagination } from "@mui/material";

const TablePaginator = ({
  tableCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      sx={{
        width: "100%",
      }}
    >
      <TablePagination
        component="div"
        count={tableCount}
        page={page - 1}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage={"Filas por página:"}
        rowsPerPageOptions={[5, 10, 15, 25, 50, 75, 100]}
      />
    </Box>
  );
};

TablePaginator.propTypes = {
  tableCount: PropTypes.number.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
};

export default TablePaginator;
