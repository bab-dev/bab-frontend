import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import TableHeader from "./TableHeader";
import TablePaginator from "./TablePaginator";

import { variables } from "variables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import ConfirmDialog from "components/dialogs/ConfirmDialog";
import { tables } from "variables/tableVariables";
import { formatDateWithBackslash } from "helpers/dateHelper";

const ClockingTable = ({
  isEditable,
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
  getClockingRegistries,
}) => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length;
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedClockingId, setSelectedClockingId] = useState("");
  const [existingClocking, setExistingClocking] = useState(null);

  const handleDelete = (event, idClocking) => {
    setSelectedClockingId(idClocking);
    setOpenConfirmDialog(true);
  };

  useEffect(() => {
    const getSelectedClocking = async () => {
      if (selectedClockingId != "") {
        try {
          const response = await axiosPrivate.get(
            `${variables.CLOCKING_URL}/${selectedClockingId}`
          );
          setExistingClocking(response.data);
        } catch (error) {
          console.error(`Error fetching transport request: ${error}`);
        }
      }
    };
    getSelectedClocking();
  }, [selectedClockingId]);

  const deleteClocking = async () => {
    if (existingClocking) {
      await axiosPrivate
        .delete(`${variables.CLOCKING_URL}/${existingClocking.Id}`)
        .then(() => {
          getClockingRegistries();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    }
  };

  const getVolunteerName = (idVolunteer) => {
    let volunteer = state.volunteer.volunteers.find(
      (volunteer) => volunteer.IdVolunteer == idVolunteer
    );
    return volunteer ? volunteer.FullName : "";
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
        <Table id={tables.CLOCKING_TABLE}>
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
                      {formatDateWithBackslash(row.Date)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>
                      {getVolunteerName(row.IDVolunteer)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>{row.ClockInTime}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>{row.ClockOutTime}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>
                      {row.TotalHoursWorked} hrs.
                    </Typography>
                  </TableCell>
                  {isEditable && (
                    <TableCell sx={{ width: "80px" }}>
                      <Grid
                        container
                        display={"flex"}
                        wrap="nowrap"
                        justifyContent={"space-around"}
                      >
                        <IconButton
                          aria-label="modify"
                          onClick={(event) => handleDelete(event, row.Id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            <ConfirmDialog
              title="Eliminar Registro de Asistencia"
              open={openConfirmDialog}
              setOpen={setOpenConfirmDialog}
              onConfirm={deleteClocking}
              successMessage={"Se ha eliminado correctamente!"}
              onClose={() => setOpenConfirmDialog(false)}
            >
              ¿Está seguro de que quiere eliminar este viaje?
            </ConfirmDialog>
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

ClockingTable.propTypes = {
  isEditable: PropTypes.bool,
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
  getClockingRegistries: PropTypes.func,
};

export default ClockingTable;
