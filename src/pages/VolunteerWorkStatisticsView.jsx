import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import { Box, Grid, MenuItem, Typography } from "@mui/material";

import { variables } from "variables";
import { headCells } from "variables/volunteerWorkStatisticsVariables";

import FormField from "components/FormField";
import VolunteerWorkStatisticsTable from "components/tables/VolunteerWorkStatisticsTable";
import { exportVariables, tables } from "variables/tableVariables";
import CustomExportButton from "components/CustomExportButton";

const VolunteerWorkStatisticsView = () => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const [statistics, setStatistics] = useState([]);

  const [tableCount, setTableCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idVolunteer, setIdVolunteer] = useState(""); //filtering

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

  const getStatisticsRegistries = async () => {
    const response = await axiosPrivate
      .get(`${variables.VOLUNTEER_WORK_STATISTICS_URL}`, {
        params: {
          idVolunteer: idVolunteer == "all" ? null : idVolunteer,
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
    setStatistics(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    getStatisticsRegistries();
  }, [idVolunteer, page, rowsPerPage, orderByColumn, orderDirection]);

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
          Estadisticas de Voluntariado
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
            p={2}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <CustomExportButton
              id="exportStatisticsButton"
              className="exportButton"
              table={tables.VOLUNTEER_WORK_STATISTICS_TABLE} // ID of the table to be exported
              filename="Estadisticas"
              sheet={exportVariables.SHEET_1}
              buttonText={exportVariables.EXPORT_TO_EXCEL}
            />
          </Grid>
        </Grid>
        <Grid container item display={"flex"} sx={{ my: 4 }}>
          <VolunteerWorkStatisticsTable
            headCells={headCells}
            dataList={statistics}
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={handleRequestSort}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerWorkStatisticsView;
