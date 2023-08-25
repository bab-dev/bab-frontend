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

import MoreVertIcon from "@mui/icons-material/MoreVert";

import TableHeader from "./TableHeader";
import TablePaginator from "./TablePaginator";

import { variables } from "variables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import TripDialog from "components/dialogs/TripDialog";
import ConfirmDialog from "components/dialogs/ConfirmDialog";
import ModifyMenu from "components/menus/ModifyMenu";

import { tables } from "variables/tableVariables";
import { tripVariables } from "variables/tripsVariables";
import { transportVariables } from "variables/transportVariables";
import { formatDateWithBackslash } from "helpers/dateHelper";

const TripTable = ({
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
  getTrips,
}) => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length;
  const [openMenu, setOpenMenu] = useState(false);
  const [openTripDialog, setOpenTripDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [existingTrip, setExistingTrip] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event, idTrip) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
    setSelectedTripId(idTrip);
  };

  useEffect(() => {
    const getSelectedTrip = async () => {
      if (selectedTripId != "") {
        try {
          const response = await axiosPrivate.get(
            `${variables.TRIP_URL}/${selectedTripId}`
          );
          setExistingTrip(response.data);
        } catch (error) {
          console.error(`Error fetching transport request: ${error}`);
        }
      }
    };
    getSelectedTrip();
  }, [selectedTripId]);

  const deleteTrip = async () => {
    if (existingTrip) {
      await axiosPrivate
        .delete(`${variables.TRIP_URL}/${existingTrip.Id}`)
        .then(() => {
          setOpenMenu(false);
          getTrips();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    }
  };

  const getCoordinatorName = (idCoordinator) => {
    let coordinator = state.volunteer.volunteers.find(
      (volunteer) => volunteer.IdVolunteer == idCoordinator
    );
    return coordinator ? coordinator.FullName : "";
  };

  const getDepartmentName = (idDepartment) => {
    let department = state.department.departments.find(
      (dpto) => dpto.Id == idDepartment
    );
    return department ? department.DepartmentName : "";
  };

  const getTransportTypeName = (transportType) => {
    let type = transportVariables.TRANSPORT_TYPES.find(
      (type) => type.value == transportType
    );
    return type ? type.label : "";
  };

  const getDepartureOrArrivalTypeName = (typeValue) => {
    let type = tripVariables.PLACE_TYPE.find((type) => type.value == typeValue);
    return type ? type.label : "";
  };

  const handleClose = () => {
    setOpenTripDialog(false);
    setOpenConfirmDialog(false);
    setOpenMenu(false);
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
        <Table id={tables.TRIP_TABLE}>
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
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>
                      {getCoordinatorName(row.IDCoordinator)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>
                      {getDepartmentName(row.IDDepartment)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "120px" }}>
                    <Typography color={"black"}>{row.Vehicule}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "136px" }}>
                    <Typography color={"black"}>
                      {formatDateWithBackslash(row.Date)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "120px" }}>
                    <Typography color={"black"}>
                      {row.NumOfPassengers}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "200px" }}>
                    <Typography color={"black"}>
                      {getTransportTypeName(row.TransportType)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "256px" }}>
                    <Typography color={"black"}>
                      {getDepartureOrArrivalTypeName(row.DepartureType)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>
                      {row.DeparturePlace}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "104px" }}>
                    <Typography color={"black"}>{row.DepartureTime}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color={"black"}>{row.InitialKm}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>
                      {getDepartureOrArrivalTypeName(row.ArrivalType)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>{row.ArrivalPlace}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "88px" }}>
                    <Typography color={"black"}>{row.ArrivalTime}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color={"black"}>{row.FinalKm}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color={"black"}>{row.TotalKm}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "120px" }}>
                    <Typography color={"black"}>
                      {row.TotalTime} hrs.
                    </Typography>
                  </TableCell>
                  {isEditable && (
                    <TableCell>
                      <Grid
                        container
                        display={"flex"}
                        wrap="nowrap"
                        justifyContent={"space-around"}
                      >
                        <IconButton
                          aria-label="modify"
                          onClick={(event) => handleOpenMenu(event, row.Id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            <ModifyMenu
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              anchorEl={anchorEl}
              onUpdateClick={() => setOpenTripDialog(true)}
              onDeleteClick={() => setOpenConfirmDialog(true)}
            />
            <TripDialog
              isUpdate
              open={openTripDialog}
              setOpen={setOpenTripDialog}
              existingTrip={existingTrip}
              onCancelClick={handleClose}
              getTrips={getTrips}
            />
            <ConfirmDialog
              title="Eliminar Viaje"
              open={openConfirmDialog}
              setOpen={setOpenConfirmDialog}
              onConfirm={deleteTrip}
              successMessage={"Se ha eliminado correctamente!"}
              onClose={handleClose}
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

TripTable.propTypes = {
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
  getTrips: PropTypes.func,
};

export default TripTable;
