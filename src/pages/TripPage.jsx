import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Fab, Grid, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { variables } from "variables";
import { headCells } from "variables/tripsVariables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import TripDialog from "components/dialogs/TripDialog";
import TripTable from "components/tables/TripTable";
import FormField from "components/FormField";
import SearchBar from "components/SearchBar";
import { generateArrayOfYears } from "helpers/dateHelper";
import CustomExportButton from "components/CustomExportButton";
import { exportVariables, tables } from "variables/tableVariables";
import theme from "theme";
import { transportVariables } from "variables/transportVariables";

const TripPage = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialg] = useState(false);

  const [trips, setTrips] = useState([]);
  const [tableCount, setTableCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [place, setPlace] = useState(""); //searching
  const [idCoordinator, setIdCoordinator] = useState(""); //filtering
  const [idDepartment, setIDDepartment] = useState("");
  const [vehicule, setVehicule] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [transportType, setTransportType] = useState("");
  const [departurePlace, setDeparturePlace] = useState("");
  const [arrivalPlace, setArrivalPlace] = useState("");

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

  const handleSearchByPlace = (event) => {
    setPage(1);
    setPlace(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderByColumn === property && orderDirection === variables.ASC;
    const toggledOrder = isAsc ? variables.DESC : variables.ASC;
    setOrderDirection(toggledOrder);
    setOrderByColum(property);
  };

  const getTrips = async () => {
    const response = await axiosPrivate
      .get(`${variables.TRIP_URL}`, {
        params: {
          place: place == "" ? null : place,
          idCoordinator: idCoordinator == "all" ? null : idCoordinator,
          idDepartment: idDepartment == "all" ? null : idDepartment,
          vehicule: vehicule == "all" ? null : vehicule,
          month: month == "all" ? null : month,
          year: year == "all" ? null : year,
          transportType: transportType == "all" ? null : transportType,
          departurePlace: departurePlace == "all" ? null : departurePlace,
          arrivalPlace: arrivalPlace == "all" ? null : arrivalPlace,
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
    setTrips(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    getTrips();
  }, [
    place,
    idCoordinator,
    idDepartment,
    vehicule,
    month,
    year,
    transportType,
    departurePlace,
    arrivalPlace,
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
  ]);

  const getVehicules = () => {
    let vehicules = state.trip.trips.map((trip) => trip.Vehicule);
    return vehicules
      .filter((item, index) => vehicules.indexOf(item) === index)
      .sort();
  };

  const getAllDeparturePlaces = () => {
    let places = state.trip.trips.map((trip) => trip.DeparturePlace);
    return places
      .filter((item, index) => places.indexOf(item) === index)
      .sort();
  };

  const getAllArrivalPlaces = () => {
    let places = state.trip.trips.map((trip) => trip.ArrivalPlace);
    return places
      .filter((item, index) => places.indexOf(item) === index)
      .sort();
  };

  return (
    <Box px="calc(10% - 5px)" py="calc(5% - 5px)">
      <Grid
        container
        item
        justifyContent="flex-start"
        display={"flex"}
        alignItems={"center"}
        sx={{
          pb: { xxs: 2, xs: 2, md: 4, lg: 4 },
          mt: 1,
        }}
      >
        <Grid
          item
          sx={{
            pr: { xxs: 2, xs: 2, md: 4, lg: 4 },
          }}
        >
          <Fab color="primary" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            sx={{
              fontSize: "1rem",
              [theme.breakpoints.up("xs")]: {
                fontSize: "1rem",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "1.5rem",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "1.5rem",
              },
              [theme.breakpoints.up("lg")]: {
                fontSize: "2rem",
              },
              [theme.breakpoints.up("xl")]: {
                fontSize: "2rem",
              },
              fontStyle: "italic",
            }}
          >
            VIAJES
          </Typography>{" "}
        </Grid>
      </Grid>
      <Grid
        container
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
            sm={3}
            md={4}
            lg={4}
            py={2}
            //width={"100%"}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <SearchBar
              value={place}
              onChange={(e) => handleSearchByPlace(e)}
              placeholder={"Buscar por Origen/Destino"}
            />
          </Grid>
          <Grid
            container
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            justifyItems={"flex-end"}
            p={2}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <Fab
              color="primary"
              variant="extended"
              size="large"
              onClick={() => setOpenDialg(true)}
            >
              <AddIcon sx={{ mr: 1 }} />
              Crear Viaje
            </Fab>
          </Grid>
        </Grid>
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
            md={3}
            lg={3}
            sx={{ pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Coordinador BAB"}
              name={"idCoordinator"}
              defaultValue={"all"}
              onChange={(event) => setIdCoordinator(event.target.value)}
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
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Departamento"}
              name={"idDepartment"}
              defaultValue={"all"}
              onChange={(event) => setIDDepartment(event.target.value)}
            >
              <MenuItem key={"allDepartments"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {state.department.departments.map((department) => (
                <MenuItem key={department.Id} value={department.Id}>
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
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Vehículo"}
              name={"vehicule"}
              defaultValue={"all"}
              onChange={(event) => setVehicule(event.target.value)}
            >
              <MenuItem key={"allVehicules"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {getVehicules().map((vehicule) => (
                <MenuItem key={vehicule} value={vehicule}>
                  {vehicule}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Tipo de Transporte"}
              name={"transportType"}
              defaultValue={"all"}
              onChange={(event) => setTransportType(event.target.value)}
            >
              <MenuItem key={"allMonths"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {transportVariables.TRANSPORT_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.typeName}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
        </Grid>
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
            md={3}
            lg={3}
            sx={{ pr: { md: 2, lg: 2 } }}
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
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Año"}
              name={"year"}
              defaultValue={"all"}
              onChange={(event) => setYear(event.target.value)}
            >
              <MenuItem key={"allMonths"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {generateArrayOfYears().map((year) => (
                <MenuItem key={`Year${year}`} value={year}>
                  {year}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Punto de Partida"}
              name={"departurePlace"}
              defaultValue={"all"}
              onChange={(event) => setDeparturePlace(event.target.value)}
            >
              <MenuItem key={"allPlaces"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {getAllDeparturePlaces().map((place) => (
                <MenuItem key={place} value={place}>
                  {place}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Punto de Llegada"}
              name={"arrivalPlace"}
              defaultValue={"all"}
              onChange={(event) => setArrivalPlace(event.target.value)}
            >
              <MenuItem key={"allPlaces"} value={"all"}>
                {"Todos"}
              </MenuItem>
              {getAllArrivalPlaces().map((place) => (
                <MenuItem key={place} value={place}>
                  {place}
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
            id="exportTripsButton"
            className="exportButton"
            table={tables.TRIP_TABLE} // ID of the table to be exported
            filename="Viajes"
            sheet={exportVariables.SHEET_1}
            buttonText={exportVariables.EXPORT_TO_EXCEL}
          />
        </Grid>
        <Grid container item display={"flex"} sx={{ my: 4 }}>
          <TripTable
            isEditable
            headCells={headCells}
            dataList={trips}
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={handleRequestSort}
            onClose={() => setOpenDialg(false)}
            getTrips={getTrips}
          />
        </Grid>
      </Grid>
      <TripDialog
        isCreate
        open={openDialog}
        setOpen={setOpenDialg}
        onCancelClick={() => setOpenDialg(false)}
        getTrips={getTrips}
      />
    </Box>
  );
};

export default TripPage;
