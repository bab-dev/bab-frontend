import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import TableHeader from "./TableHeader";
import TablePaginator from "./TablePaginator";

import { variables } from "variables";
import { tables } from "variables/tableVariables";

const VolunteerWorkStatisticsTable = ({
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
  const state = useSelector((state) => state);
  const isNotFound = !dataList.length || dataList == null;

  const getVolunteerName = (idVolunteer) => {
    let volunteer = state.volunteer.volunteers.find(
      (volunteer) => volunteer.IdVolunteer == idVolunteer
    );
    if (volunteer) {
      return volunteer.FullName;
    } else {
      return "";
    }
  };

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
        <Table id={tables.VOLUNTEER_WORK_STATISTICS_TABLE}>
          <TableHeader
            headCells={headCells}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={onSortChange}
          />
          <TableBody>
            {dataList.map((row) => {
              return (
                <TableRow
                  hover
                  key={row.Id}
                  tabIndex={-1}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">
                    <Typography color={"black"}>
                      {getVolunteerName(row.IDVolunteer)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>
                      {row.TotalHoursWorked} Hrs.
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.PercenatgeWorkedOnDelivery} %
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.PercenatgeWorkedOnPickUp} %
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.PercenatgeWorkedOnFoodSelection} %
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.PercenatgeWorkedOnDistributionToFamilies} %
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.PercenatgeWorkedOnCleaning} %
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.PercenatgeWorkedOnMeetings} %
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.PercenatgeWorkedOnOtherTasks} %
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {isNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="left" colSpan={6} sx={{ py: 3 }}>
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

VolunteerWorkStatisticsTable.propTypes = {
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

export default VolunteerWorkStatisticsTable;
