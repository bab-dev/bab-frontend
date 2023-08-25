import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useMediaQuery, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import PropTypes from "prop-types";
import { variables } from "variables";
import { tables } from "variables/tableVariables";

import TransportRequestTable from "components/tables/TransportRequestTable";
import TransportRequestDialog from "components/dialogs/TransportRequestDialog";
import { transportVariables } from "variables/transportVariables";

const PendingTransportRequestTable = ({ userFullName, headCells }) => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialog] = useState(false);

  const [tableCount, setTableCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderByColumn, setOrderByColum] = useState("CreatedAt"); //property
  const [orderDirection, setOrderDirection] = useState("asc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

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

  const getPendingTransportRequests = async () => {
    const response = await axiosPrivate
      .get(`${variables.TRANSPORT_REQUEST_URL}`, {
        params: {
          Name: userFullName,
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
  }, [
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
    state.transport.request,
  ]);

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
          item
          xxs={12}
          xs={12}
          sm={6}
          md={4}
          lg={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          p={2}
          pr={0}
        >
          <Fab
            color="primary"
            variant="extended"
            size="large"
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon sx={{ mr: 1 }} />
            {isMediumScreen ? "Registrar" : "Crear Solicitud"}
          </Fab>
        </Grid>
        <TransportRequestDialog
          isCreate
          isUpdate={false}
          isDirector={false}
          open={openDialog}
          setOpen={setOpenDialog}
          getTransportRequests={getPendingTransportRequests}
        />
      </Grid>
      <Grid container item display={"flex"}>
        <TransportRequestTable
          idTable={tables.PENDING_TRANSPORT_REQUEST_TABLE}
          headCells={headCells}
          dataList={pendingRequests}
          tableCount={tableCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          orderByColumn={orderByColumn}
          orderDirection={orderDirection}
          onSortChange={handleRequestSort}
          getTransportRequests={getPendingTransportRequests}
        />
      </Grid>
    </Grid>
  );
};

PendingTransportRequestTable.propTypes = {
  userFullName: PropTypes.string,
  headCells: PropTypes.array,
};

export default PendingTransportRequestTable;
