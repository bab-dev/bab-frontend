import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useMediaQuery, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import { variables } from "variables";
import { tables } from "variables/tableVariables";
import {
  headCellsNewIncomingTransportRequest,
  transportVariables,
} from "variables/transportVariables";
import { exportVariables } from "variables/tableVariables";

import TransportRequestDialog from "components/dialogs/TransportRequestDialog";
import TransportRequestTable from "components/tables/TransportRequestTable";
import { setSelectedTransportRequest } from "actions/transportActions";

import CustomExportButton from "components/CustomExportButton";

const NewIncomingTransportRequestTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialog] = useState(false);

  const [tableCount, setTableCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderByColumn, setOrderByColum] = useState("CreatedAt"); //property
  const [orderDirection, setOrderDirection] = useState("asc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

  const [isApproveClicked, setIsApproveClicked] = useState(false);
  const [isRejectClicked, setIsRejectClicked] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");

  const isMediumScreen = useMediaQuery("(width: 912px)");

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    var rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPage(1); //Reset pageNumber value
  };

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderByColumn === property && orderDirection === variables.ASC;
    const toggledOrder = isAsc ? variables.DESC : variables.ASC;
    setOrderDirection(toggledOrder);
    setOrderByColum(property);
  };

  const approveRequest = (id) => {
    setSelectedRequestId(id);
    setIsApproveClicked(true); // flag to control when the page have to update the request list
  };

  const rejectRequest = (id) => {
    setSelectedRequestId(id);
    setIsRejectClicked(true); // flag to control when the page have to update the request list
  };

  const getPendingTransportRequests = async () => {
    const response = await axiosPrivate
      .get(`${variables.TRANSPORT_REQUEST_URL}`, {
        params: {
          Status: transportVariables.REQUEST_STATUS.PENDING.value,
          PageSize: rowsPerPage,
          PageNumber: page,
          OrderBy: orderByParam,
        },
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
    setPendingRequests(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    getPendingTransportRequests();
    // set consts to its original form
    setIsApproveClicked(false);
    setIsRejectClicked(false);
  }, [
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
    isApproveClicked,
    isRejectClicked,
    state.transport.request,
  ]);

  useEffect(() => {
    var action = isApproveClicked ? "approve" : isRejectClicked ? "reject" : "";

    const reviewTransportRequest = async () => {
      if (action != "") {
        await axiosPrivate
          .put(
            `${variables.TRANSPORT_REQUEST_URL}/${action}/${selectedRequestId}`,
            {
              params: {
                PageSize: rowsPerPage,
                PageNumber: page,
                OrderBy: orderByParam,
              },
            }
          )
          .then((response) => {
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

    reviewTransportRequest();
  }, [isApproveClicked, isRejectClicked]);

  return (
    <Grid
      container
      display={"flex"}
      flexWrap={"nowrap"}
      direction={"column"}
      px="calc(8% - 10px)"
      mb={8}
    >
      <Grid container item justifyContent={"flex-end"} mb={2}>
        <Grid
          container
          item
          xxs={12}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
          // p={2}
          sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
        >
          <CustomExportButton
            id="exportNewIncomingTransportRequestButton"
            className="exportButton"
            table={tables.NEW_INCOMING_TRANSPORT_REQUEST_TABLE} // ID of the table to be exported
            filename="NuevasSolicitudesTransporte"
            sheet={exportVariables.SHEET_1}
            buttonText={exportVariables.EXPORT_TO_EXCEL}
          />
        </Grid>
        <Grid
          item
          xxs={12}
          xs={12}
          sm={6}
          md={4}
          lg={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          p={2}
          pr={0}
        >
          <Fab
            color="primary"
            variant="extended"
            size="medium"
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon sx={{ mr: 1 }} />
            {isMediumScreen ? "Registrar" : "Crear Solicitud"}
          </Fab>
        </Grid>
        <TransportRequestDialog
          isCreate
          isUpdate={false}
          isDirector={true}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      </Grid>
      <Grid container item display={"flex"}>
        <TransportRequestTable
          idTable={tables.NEW_INCOMING_TRANSPORT_REQUEST_TABLE}
          showAllColumns
          isAction
          isDirector //is Director view
          hideStatus
          headCells={headCellsNewIncomingTransportRequest}
          dataList={pendingRequests}
          tableCount={tableCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          orderByColumn={orderByColumn}
          orderDirection={orderDirection}
          onSortChange={handleRequestSort}
          onClickApprove={approveRequest}
          onClickReject={rejectRequest}
          getTransportRequests={getPendingTransportRequests}
        />
      </Grid>
    </Grid>
  );
};

export default NewIncomingTransportRequestTable;
