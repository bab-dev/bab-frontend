import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import TableHeader from "../TableHeader";
import TablePaginator from "../TablePaginator";

import { variables } from "variables";
import { formatDateTimeWithBackslash } from "helpers/dateHelper";
import { getAvatarByEventType } from "helpers/avatarHelper";
import { tables } from "variables/tableVariables";

const VolunteerEventTable = ({
  headCells,
  dataList,
  tableCount,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  orderByColumn,
  orderDirection,
  onSortChange,
}) => {
  const isNotFound = !dataList.length;
  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "0 2px 6px 0 #000000",
        p: 2,
      }}
      elevation={6}
    >
      <TableContainer>
        <Table id={tables.VOLUNTEER_EVENT_TABLE}>
          <TableHeader
            headCells={headCells}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={onSortChange}
          />
          <TableBody>
            {dataList.map((row) => {
              return (
                <TableRow key={row.Id} tabIndex={-1}>
                  <TableCell>
                    <Box
                      display="flex"
                      width={"100%"}
                      justifyContent={"center"}
                    >
                      {getAvatarByEventType(row.EventTypeValue)}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>{row.Title}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>
                      {row.DepartmentName}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>
                      {formatDateTimeWithBackslash(row.StartDateTime)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" size="small">
                    <Typography color={"black"}>
                      {formatDateTimeWithBackslash(row.EndDateTime)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {isNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <Typography variant="h6">
                    No se encontraron resultados &nbsp;
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePaginator
        tableCount={tableCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

VolunteerEventTable.propTypes = {
  headCells: PropTypes.array,
  dataList: PropTypes.array,
  tableCount: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  onRowsPerPageChange: PropTypes.func,
  orderByColumn: PropTypes.string,
  orderDirection: PropTypes.oneOf([variables.ASC, variables.DESC]),
  onSortChange: PropTypes.func,
};

export default VolunteerEventTable;
