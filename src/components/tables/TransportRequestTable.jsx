import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  Chip,
  Fab,
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

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import TableHeader from "./TableHeader";
import TablePaginator from "./TablePaginator";

import { variables } from "variables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import TransportRequestDialog from "components/dialogs/TransportRequestDialog";
import ConfirmDialog from "components/dialogs/ConfirmDialog";
import ModifyMenu from "components/menus/ModifyMenu";
import theme from "theme";
import { transportVariables } from "variables/transportVariables";
import { setSelectedTransportRequest } from "actions/transportActions";
import { formatDateWithBackslash } from "helpers/dateHelper";

const TransportRequestTable = ({
  idTable,
  showAllColumns,
  isDirector,
  isAction,
  isEditable,
  hideStatus,
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
  onClickApprove,
  onClickReject,
  getTransportRequests,
}) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length;
  const [openMenu, setOpenMenu] = useState(false);
  const [openTransportRequestDialog, setOpenTransportRequestDialog] =
    useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [existingRequest, setExistingRequest] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event, requestId) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
    setSelectedRequestId(requestId);
  };

  useEffect(() => {
    const getSelectedRequest = async () => {
      if (selectedRequestId != "") {
        try {
          const response = await axiosPrivate.get(
            `${variables.TRANSPORT_REQUEST_URL}/${selectedRequestId}`
          );
          setExistingRequest(response.data);
        } catch (error) {
          console.error(`Error fetching transport request: ${error}`);
        }
      }
    };
    getSelectedRequest();
  }, [selectedRequestId]);

  const deleteTransportRequest = async () => {
    if (existingRequest) {
      await axiosPrivate
        .delete(`${variables.TRANSPORT_REQUEST_URL}/${existingRequest.Id}`)
        .then((response) => {
          getTransportRequests();
          dispatch(setSelectedTransportRequest(response.data));
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    }
  };

  const getTransportTypeName = (transportTypeName) => {
    let type = transportVariables.TRANSPORT_TYPES.find(
      (type) => type.name == transportTypeName
    );
    return type ? type.label : "";
  };

  const getTransportPriorityName = (priority) => {
    let type = transportVariables.TRANSPORT_REQUEST_PRIORITY.find(
      (type) => type.value == priority
    );
    return type ? type.label : "";
  };

  const getTransportStatusName = (status) => {
    let type = transportVariables.TRANSPORT_REQUEST_STATUS.find(
      (type) => type.value == status
    );
    return type ? type.label : "";
  };

  const handleClose = () => {
    setOpenTransportRequestDialog(false);
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
        <Table id={idTable}>
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
                  <TableCell align="left" sx={{ minWidth: "128px" }}>
                    <Typography color={"black"}>
                      {formatDateWithBackslash(row.Date)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "168px" }}>
                    <Typography color={"black"}>
                      {getTransportTypeName(row.TransportTypeName)}
                    </Typography>
                  </TableCell>
                  {showAllColumns && (
                    <TableCell align="left" sx={{ minWidth: "120px" }}>
                      <Typography color={"black"}>
                        {row.DepartmentName}
                      </Typography>
                    </TableCell>
                  )}
                  {showAllColumns && (
                    <TableCell align="left" sx={{ minWidth: "272px" }}>
                      <Typography color={"black"}>
                        {row.CoordinatorName}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>{row.Place}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "192px" }}>
                    <Typography color={"black"}>{row.TimeRange}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "80px" }}>
                    <Typography color={"black"}>
                      {getTransportPriorityName(row.Priority)}
                    </Typography>
                  </TableCell>
                  {!hideStatus && (
                    <TableCell align="left" sx={{ width: "80px" }}>
                      <Chip
                        label={getTransportStatusName(row.Status)}
                        color={
                          row.Status ==
                          transportVariables.REQUEST_STATUS.PENDING.value
                            ? "warning"
                            : row.Status ==
                              transportVariables.REQUEST_STATUS.APPROVED.value
                            ? "success"
                            : "error"
                        }
                        sx={{ color: theme.palette.common.white }}
                      />
                    </TableCell>
                  )}
                  {isAction && (
                    <TableCell align="center" sx={{ minWidth: "128px" }}>
                      <Grid
                        container
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Fab
                          color="success"
                          onClick={() => onClickApprove(row.Id)}
                          size="small"
                          sx={{ mr: 1, color: theme.palette.common.white }}
                        >
                          <CheckIcon />
                        </Fab>
                        <Fab
                          color="primary"
                          onClick={() => onClickReject(row.Id)}
                          size="small"
                          sx={{ ml: 1, color: theme.palette.common.white }}
                        >
                          <CloseIcon />
                        </Fab>
                      </Grid>
                    </TableCell>
                  )}
                  {isEditable && (
                    <TableCell sx={{ width: "96px" }}>
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
                  <ModifyMenu
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    anchorEl={anchorEl}
                    onUpdateClick={() => setOpenTransportRequestDialog(true)}
                    onDeleteClick={() => setOpenConfirmDialog(true)}
                  />
                </TableRow>
              );
            })}

            <TransportRequestDialog
              isUpdate={true}
              isDirector={isDirector}
              open={openTransportRequestDialog}
              setOpen={setOpenTransportRequestDialog}
              existingRequest={existingRequest}
              setExistingRequest={setExistingRequest}
              onClose={handleClose}
              getTransportRequests={getTransportRequests}
            />
            <ConfirmDialog
              title="Eliminar Solicitud de Transporte"
              open={openConfirmDialog}
              setOpen={setOpenConfirmDialog}
              onConfirm={deleteTransportRequest}
              successMessage={"Se ha eliminado correctamente!"}
              onClose={handleClose}
            >
              ¿Está seguro de que quiere eliminar esta solicitud?
            </ConfirmDialog>
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

TransportRequestTable.propTypes = {
  idTable: PropTypes.any,
  showAllColumns: PropTypes.bool,
  isDirector: PropTypes.bool,
  isAction: PropTypes.bool,
  isEditable: PropTypes.bool,
  hideStatus: PropTypes.bool,
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
  onClickApprove: PropTypes.func,
  onClickReject: PropTypes.func,
  getTransportRequests: PropTypes.func,
};

export default TransportRequestTable;
