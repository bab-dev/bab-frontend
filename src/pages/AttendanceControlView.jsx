import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import { Box, Grid, MenuItem, Typography } from "@mui/material";

import { variables } from "variables";
import { headCells } from "variables/clockingVariables";

import ClockingTable from "components/tables/ClockingTable";
import FormField from "components/FormField";
import { generateArrayOfYears } from "helpers/dateHelper";
import CustomExportButton from "components/CustomExportButton";
import { exportVariables, tables } from "variables/tableVariables";

const AttendanceControlView = () => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const [clockingRegistries, setClockingRegistries] = useState([]);

  const [tableCount, setTableCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idVolunteer, setIdVolunteer] = useState(""); //filtering
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [orderByColumn, setOrderByColum] = useState(""); //property
  const [orderDirection, setOrderDirection] = useState("asc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

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

  const getClockingRegistries = async () => {
    const response = await axiosPrivate
      .get(`${variables.CLOCKING_URL}`, {
        params: {
          idVolunteer: idVolunteer == "all" ? null : idVolunteer,
          month: month == "all" ? null : month,
          year: year == "all" ? null : year,
          pageSize: rowsPerPage,
          pageNumber: page,
          orderBy: orderByParam,
        },
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
    setClockingRegistries(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    getClockingRegistries();
  }, [
    idVolunteer,
    month,
    year,
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
  ]);

  return (
    <Box>
      <Grid
        container
        display={"flex"}
        flexWrap={"nowrap"}
        direction={"column"}
        px="calc(8% - 10px)"
        mb={4}
      >
        <Typography variant="h5" sx={{ my: 4 }}>
          Control de Asistencia
        </Typography>
        <Grid
          container
          item
          justifyContent={"space-between"}
          justifyItems={"space-between"}
          display={"flex"}
          flexWrap={"nowrap"}
          direction={{
            xxs: "column",
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          }}
        >
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{ pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Voluntario"}
              name={"idVoluntario"}
              defaultValue={"all"}
              onChange={(event) => setIdVolunteer(event.target.value)}
            >
              <MenuItem key={"allCoordinators"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {state.volunteer.volunteers.map((volunteer) => (
                <MenuItem
                  key={volunteer.IdVolunteer}
                  value={volunteer.IdVolunteer}
                >
                  {volunteer.FullName}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{ pl: { md: 4, lg: 4 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Mes"}
              name={"month"}
              defaultValue={"all"}
              onChange={(event) => setMonth(event.target.value)}
            >
              <MenuItem key={"allMonths"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {variables.MONTHS.map((month) => (
                <MenuItem key={month.name} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{ pl: { md: 4, lg: 4 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Año"}
              name={"year"}
              defaultValue={"all"}
              onChange={(event) => setYear(event.target.value)}
            >
              <MenuItem key={"allYears"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {generateArrayOfYears().map((year) => (
                <MenuItem key={`Year${year}`} value={year}>
                  {year}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
        </Grid>
        <Grid
          container
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
          sx={{ pt: 2, pb: 1 }}
        >
          <CustomExportButton
            id="exportClockingButton"
            className="exportButton"
            table={tables.CLOCKING_TABLE} // ID of the table to be exported
            filename="Asistencia"
            sheet={exportVariables.SHEET_1}
            buttonText={exportVariables.EXPORT_TO_EXCEL}
          />
        </Grid>
        <Grid container item display={"flex"} sx={{ my: 4 }}>
          <ClockingTable
            isEditable
            headCells={headCells}
            dataList={clockingRegistries}
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={handleRequestSort}
            getClockingRegistries={getClockingRegistries}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceControlView;
