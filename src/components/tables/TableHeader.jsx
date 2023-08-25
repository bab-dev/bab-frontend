import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

import theme from "../../theme";

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

const TableHeader = (props) => {
  const { orderByColumn, orderDirection, onSortChange, headCells } = props;

  const createSortHandler = (property) => (event) => {
    onSortChange(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          "& th": {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={
              orderByColumn === headCell.id ? orderDirection : false
            }
          >
            <TableSortLabel
              hideSortIcon
              active={orderByColumn === headCell.id}
              direction={orderByColumn === headCell.id ? orderDirection : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography fontWeight={"bold"}>{headCell.label}</Typography>
              {orderByColumn === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {orderDirection === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  headCells: PropTypes.array,
  orderDirection: PropTypes.oneOf(["asc", "desc"]),
  orderByColumn: PropTypes.string,
  onSortChange: PropTypes.func,
};

export default TableHeader;
