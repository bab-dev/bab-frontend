import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setVolunteerAssignedEvents } from "actions/eventActions";

import { Box, Fab, Grid, MenuItem, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Calendar from "components/Calendar";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "variables";
import { getColor } from "helpers/colorHelper";
import theme from "theme";
import EventVolunteerTable from "components/tables/director/EventVolunteerTable";
import SearchBar from "components/SearchBar";
import FormField from "components/FormField";
import VolunteerEventTable from "components/tables/volunteer/VolunteerEventTable";
import CustomExportButton from "components/CustomExportButton";

import { exportVariables, tables } from "variables/tableVariables";
import { headCellsDirectorView } from "variables/eventVariables";

const headCellsVolunteerView = headCellsDirectorView.slice(0, 5);

const ActivitiesPage = () => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const isAdmin = state.user.roles.includes(variables.USER_ROLES.ADMIN);
  const isUser = state.user.roles.includes(variables.USER_ROLES.USER);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [paginatedEvents, setPaginatedEvents] = useState([]);

  // All Events params
  const [filterTitle, setFilterTitle] = useState("");
  const [idDepartment, setIdDepartment] = useState("");
  const [orderByColumn, setOrderByColum] = useState("Start"); //property
  const [orderDirection, setOrderDirection] = useState("desc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

  //Pagination
  const [tableCount, setTableCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Volunteer Events params
  const [filterTitleVolunteerEvents, setFilterTitleVolunteerEvents] =
    useState("");
  const [idDepartmentVolunteerEvents, setIdDepartmentVolunteerEvents] =
    useState("");
  const [tableCountVolunteerEvents, setTableCountVolunteerEvents] = useState(0);
  const [pageVolunteerEvents, setPageVolunteerEvents] = useState(1);
  const [rowsPerPageVolunteerEvents, setRowsPerPageVolunteerEvents] =
    useState(5);

  const handleChangePage = (event, newPage) => {
    if (isAdmin) {
      setPage(newPage + 1);
    } else {
      setPageVolunteerEvents(newPage + 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    var rowsPerPage = parseInt(event.target.value, 10);
    if (isAdmin) {
      setRowsPerPage(rowsPerPage);
      setPage(1); //Reset pageNumber value
    } else {
      setRowsPerPageVolunteerEvents(rowsPerPage);
      setPageVolunteerEvents(1);
    }
  };

  const handleFilterByTitle = (event) => {
    setPage(1);
    if (isUser) {
      setFilterTitleVolunteerEvents(event.target.value);
    } else {
      setFilterTitle(event.target.value);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderByColumn === property && orderDirection === variables.ASC;
    const toggledOrder = isAsc ? variables.DESC : variables.ASC;
    setOrderDirection(toggledOrder);
    setOrderByColum(property);
  };

  const formatEvents = (eventsList) => {
    if (eventsList.length > 0) {
      const formattedList = eventsList.map((event) => {
        return {
          ...event,
          title: event.Title,
          start: event.StartDateTime,
          end: event.EndDateTime,
          color: getColor(event.Title),
        };
      });
      return formattedList;
    }
  };

  const getAllEvents = async () => {
    const response = await axiosPrivate
      .get(`${variables.EVENT_URL}`)
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });

    var formattedList = formatEvents(response.data);
    setEvents(formattedList);

    //Update the EventVolunteer data list
    if (isAdmin) {
      getAllPaginatedEvents();
    }
  };

  const getAllPaginatedEvents = async () => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    const response = await axiosPrivate
      .get(`${variables.EVENT_URL}`, {
        params: {
          title: filterTitle == "" ? null : filterTitle,
          idDepartment: idDepartment == "all" ? null : idDepartment,
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
    setPaginatedEvents(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  const getEventsByIdVolunteer = async () => {
    await axiosPrivate
      .get(
        `${variables.EVENT_VOLUNTEER_URL}/${variables.VOLUNTEER_URL}/${state.user.userData.Volunteer.Id}/${variables.EVENT_URL}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          dispatch(setVolunteerAssignedEvents(response.data));
          getPaginatedEventsByIdVolunteer();
        }
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const getPaginatedEventsByIdVolunteer = async () => {
    await axiosPrivate
      .get(
        `${variables.EVENT_VOLUNTEER_URL}/${variables.VOLUNTEER_URL}/${state.user.userData.Volunteer.Id}/${variables.EVENT_URL}`,
        {
          params: {
            title:
              filterTitleVolunteerEvents == ""
                ? null
                : filterTitleVolunteerEvents,
            idDepartment:
              idDepartmentVolunteerEvents == "all"
                ? null
                : idDepartmentVolunteerEvents,
            pageSize: rowsPerPageVolunteerEvents,
            pageNumber: pageVolunteerEvents,
            orderBy: orderByParam,
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          dispatch(setVolunteerAssignedEvents(response.data));

          //Set pagination params
          var paginationHeaders = response.headers["x-pagination"];
          var parsedPaginationHeaders = JSON.parse(paginationHeaders);
          setTableCountVolunteerEvents(parsedPaginationHeaders.TotalCount);
        }
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  useEffect(() => {
    getAllEvents();
    getEventsByIdVolunteer();
  }, []);

  useEffect(() => {
    getAllPaginatedEvents();
  }, [
    filterTitle,
    idDepartment,
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
  ]);

  useEffect(() => {
    getPaginatedEventsByIdVolunteer();
  }, [
    filterTitleVolunteerEvents,
    idDepartmentVolunteerEvents,
    pageVolunteerEvents,
    rowsPerPageVolunteerEvents,
    orderByColumn,
    orderDirection,
  ]);

  return (
    <Box px="calc(10% - 10px)" py="calc(5% - 5px)" flexGrow={1}>
      <Grid
        container
        item
        justifyContent="flex-start"
        display={"flex"}
        alignItems={"center"}
        sx={{
          pb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
          mt: 1,
        }}
      >
        <Grid
          item
          sx={{
            pr: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
          }}
        >
          <Fab color="primary" onClick={() => navigate(-1)} size="medium">
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
            ACTIVIDADES
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        width={"100%"}
        px="calc(10% - 5px)"
        mb={4}
      >
        <Calendar
          isDirector={isAdmin}
          events={events}
          getAllEvents={getAllEvents}
          getEventsByIdVolunteer={getEventsByIdVolunteer}
        />
      </Grid>
      <Grid
        container
        justifyContent={"flex-start"}
        sx={{
          px: { md: 8, lg: 8 },
          mt: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 6 },
          mb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
        }}
      >
        <Typography variant="h5">Actividades Registradas</Typography>
      </Grid>
      <Grid
        container
        display={"flex"}
        flexWrap={"nowrap"}
        direction={"column"}
        px="calc(10% - 10px)"
      >
        {isAdmin && (
          <Box>
            <Grid
              container
              item
              justifyContent={"flex-start"}
              justifyItems={"flex-start"}
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
                p={2}
                width={"100%"}
                justifyContent={"flex-end"}
                sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
              >
                <SearchBar
                  value={filterTitle}
                  onChange={(e) => handleFilterByTitle(e)}
                  placeholder={"Buscar por Título de la Actividad"}
                />
              </Grid>
              <Grid
                item
                xxs={12}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
                justifyContent={"flex-end"}
              >
                <FormField
                  required={true}
                  select={true}
                  label={"Departamento"}
                  name={"idDepartment"}
                  defaultValue={"all"}
                  onChange={(event) => setIdDepartment(event.target.value)}
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
                id="exportEventVolunteersButton"
                className="exportButton"
                table={tables.EVENT_VOLUNTEER_TABLE} // ID of the table to be exported
                filename="Actividades"
                sheet={exportVariables.SHEET_1}
                buttonText={exportVariables.EXPORT_TO_EXCEL}
              />
            </Grid>
            <Grid container item display={"flex"} sx={{ my: 4 }}>
              <EventVolunteerTable
                headCells={headCellsDirectorView}
                dataList={paginatedEvents}
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
          </Box>
        )}

        {isUser && (
          <Box>
            <Grid
              container
              item
              justifyContent={"flex-start"}
              justifyItems={"flex-start"}
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
                p={2}
                width={"100%"}
                justifyContent={"flex-end"}
                sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
              >
                <SearchBar
                  value={filterTitleVolunteerEvents}
                  onChange={(e) => handleFilterByTitle(e)}
                  placeholder={"Buscar por Título de la Actividad"}
                />
              </Grid>
              <Grid
                item
                xxs={12}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
                justifyContent={"flex-end"}
              >
                <FormField
                  required={true}
                  select={true}
                  label={"Departamento"}
                  name={"idDepartmentVolunteerEvents"}
                  defaultValue={"all"}
                  onChange={(event) =>
                    setIdDepartmentVolunteerEvents(event.target.value)
                  }
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
            </Grid>
            <Grid container item display={"flex"} sx={{ my: 4 }}>
              <VolunteerEventTable
                headCells={headCellsVolunteerView}
                dataList={state.events.volunteerEvents}
                tableCount={tableCountVolunteerEvents}
                page={pageVolunteerEvents}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPageVolunteerEvents}
                onRowsPerPageChange={handleChangeRowsPerPage}
                orderByColumn={orderByColumn}
                orderDirection={orderDirection}
                onSortChange={handleRequestSort}
              />
            </Grid>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ActivitiesPage;
