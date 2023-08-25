import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import PropTypes from "prop-types";
import { variables } from "variables";

import { Grid, MenuItem } from "@mui/material";

import TransportRequestTable from "components/tables/TransportRequestTable";
import SearchBar from "components/SearchBar";
import FormField from "components/FormField";
import { exportVariables, tables } from "variables/tableVariables";
import CustomExportButton from "components/CustomExportButton";
import { transportVariables } from "variables/transportVariables";

const AllTransportRequestsTable = ({
  isDirector,
  isEditable,
  userFullName,
  headCells,
}) => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const [tableCount, setTableCount] = useState(0);
  const [allRequests, setAllRequests] = useState([]);

  //Query params to be sent in GET request
  const [idDepartment, setIDDepartment] = useState(null);
  const [transportType, setTransportType] = useState(-1);
  //const [minRequestDate, setMinRequestDate] = useState(null);
  //const [maxRequestDate, setMaxRequestDate] = useState(null);
  const [priority, setPriority] = useState(-1);
  const [status, setStatus] = useState(-1);

  const [filterName, setFilterName] = useState("");

  const [orderByColumn, setOrderByColum] = useState("CreatedAt"); //property
  const [orderDirection, setOrderDirection] = useState("asc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

  //Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    var rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPage(1); //Reset pageNumber value
  };

  const handleFilterByName = (event) => {
    setPage(1);
    setFilterName(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderByColumn === property && orderDirection === variables.ASC;
    const toggledOrder = isAsc ? variables.DESC : variables.ASC;
    setOrderDirection(toggledOrder);
    setOrderByColum(property);
  };

  const getAllTransportRequests = async () => {
    const response = await axiosPrivate
      .get(`${variables.TRANSPORT_REQUEST_URL}`, {
        params: {
          Name: isDirector ? filterName : userFullName,
          IDDepartment: idDepartment == "all" ? null : idDepartment,
          TransportType: transportType == -1 ? null : transportType,
          Status: status == -1 ? null : status,
          Priority: priority == -1 ? null : priority,
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
    setAllRequests(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    getAllTransportRequests();
  }, [
    filterName,
    idDepartment,
    transportType,
    priority,
    status,
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
    state.transport.request,
  ]);

  return (
    <Grid
      container
      item
      display={"flex"}
      flexWrap={"nowrap"}
      direction={"column"}
      px="calc(8% - 10px)"
      mb={4}
    >
      <Grid
        container
        item
        justifyContent={"space-between"}
        display={"flex"}
        flexWrap={"nowrap"}
        direction={{
          xxs: "column",
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
        }}
        mb={2}
      >
        {isDirector && (
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={3}
            p={2}
            width={"100%"}
            justifyContent={"flex-start"}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <SearchBar
              value={filterName}
              onChange={(e) => handleFilterByName(e)}
              placeholder={"Buscar por nombree del Coordinador"}
            />
          </Grid>
        )}
        <Grid
          item
          xxs={12}
          xs={12}
          sm={6}
          md={isDirector ? 2 : 3}
          lg={isDirector ? 2 : 3}
          sx={{
            pl: { md: isDirector ? 4 : 0, lg: isDirector ? 4 : 0 },
            pr: { md: 2, lg: 2 },
          }}
        >
          <FormField
            required={true}
            select={true}
            label={"Departamento"}
            name={"idDepartment"}
            defaultValue={"all"}
            onChange={(event) => setIDDepartment(event.target.value)}
          >
            <MenuItem key={`allDepartments`} value={"all"}>
              {"Todos"}
            </MenuItem>
            {state.department.departments.map((department) => (
              <MenuItem
                key={`IdDepartment:${department.DepartmentName}`}
                value={department.Id}
              >
                {department.DepartmentName}
              </MenuItem>
            ))}
          </FormField>
        </Grid>
        <Grid
          item
          xxs={12}
          xs={12}
          sm={6}
          md={isDirector ? 2 : 3}
          lg={isDirector ? 2 : 3}
          sx={{ px: { md: 2, lg: 2 } }}
        >
          <FormField
            required={true}
            select={true}
            label={"Tipo de Transporte"}
            name={"transportType"}
            defaultValue={-1}
            onChange={(event) => setTransportType(event.target.value)}
          >
            {transportVariables.TRANSPORT_TYPES.map((type) => (
              <MenuItem key={`reansportType:${type.name}`} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </FormField>
        </Grid>
        <Grid
          item
          xxs={12}
          xs={12}
          sm={6}
          md={isDirector ? 2 : 3}
          lg={isDirector ? 2 : 3}
          sx={{ px: { md: 2, lg: 2 } }}
        >
          <FormField
            required={true}
            select={true}
            label={"Prioridad"}
            name={"priority"}
            defaultValue={-1}
            onChange={(event) => setPriority(event.target.value)}
          >
            {transportVariables.TRANSPORT_REQUEST_PRIORITY.map((priority) => (
              <MenuItem
                key={`priority:${priority.name}`}
                value={priority.value}
              >
                {priority.label}
              </MenuItem>
            ))}
          </FormField>
        </Grid>
        <Grid
          item
          xxs={12}
          xs={12}
          sm={6}
          md={isDirector ? 2 : 3}
          lg={isDirector ? 2 : 3}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          pl={2}
          sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
        >
          <FormField
            required={true}
            select={true}
            label={"Estado"}
            name={"status"}
            defaultValue={-1}
            onChange={(event) => setStatus(event.target.value)}
          >
            {transportVariables.TRANSPORT_REQUEST_STATUS.map((status) => (
              <MenuItem key={`status:${status.name}`} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </FormField>
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        justifyItems={"flex-end"}
        pb={4}
      >
        <CustomExportButton
          id="exportNewIncomingTransportRequestButton"
          className="exportButton"
          table={tables.ALL_TRANSPORT_REQUEST_TABLE} // ID of the table to be exported
          filename="RegistroSolicitudesTransporte"
          sheet={exportVariables.SHEET_1}
          buttonText={exportVariables.EXPORT_TO_EXCEL}
        />
      </Grid>
      <Grid container item justifyContent={"center"} display={"flex"}>
        <TransportRequestTable
          idTable={tables.ALL_TRANSPORT_REQUEST_TABLE}
          showAllColumns={isDirector ? true : false}
          isDirector={isDirector ? true : false}
          isEditable={isEditable ? true : false}
          headCells={headCells}
          dataList={allRequests}
          tableCount={tableCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          orderByColumn={orderByColumn}
          orderDirection={orderDirection}
          onSortChange={handleRequestSort}
          getTransportRequests={getAllTransportRequests}
        />
      </Grid>
    </Grid>
  );
};

AllTransportRequestsTable.propTypes = {
  isDirector: PropTypes.bool,
  isEditable: PropTypes.bool,
  userFullName: PropTypes.string,
  headCells: PropTypes.array,
};

export default AllTransportRequestsTable;
