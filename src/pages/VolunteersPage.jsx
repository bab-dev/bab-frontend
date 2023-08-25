import React, { useState, useEffect } from "react";
import {
  useMediaQuery,
  Box,
  Fab,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "../variables.js";

import { setVolunteers } from "actions/volunteerActions.js";
import {
  setSelectedPerson,
  setSelectedVolunteer,
  setSelectedVolunteerAvailability,
  setSelectedEmergencyContact,
} from "actions/selectedPersonVolunteerActions.js";

import VolunteerCard from "components/cards/VolunteerCard";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TablePaginator from "components/tables/TablePaginator.jsx";
import FormField from "components/FormField.jsx";
import SearchBar from "components/SearchBar.jsx";
import PersonVolunteerDialog from "components/dialogs/PersonVolunteerDialog.jsx";
import { sortList } from "helpers/sortingHelper.js";
import theme from "theme.js";
import { volunteerVariables } from "variables/volunteerVariables.js";

const VolunteersPage = () => {
  const [openDialog, setOpenDialg] = useState(false);
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !state.volunteer.volunteers.length;

  //Query params to be sent in GET request
  const [filterName, setFilterName] = useState("");
  const [idDepartment, setIDDepartment] = useState(null);
  const [role, setRole] = useState(-1); //All the role types
  const [isActive, setIsActive] = useState(true);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [tableCount, setTableCount] = useState(
    state.volunteer.volunteers ? state.volunteer.volunteers.length : 0
  );

  const isMediumScreen = useMediaQuery("(max-width: 1280px)");

  const openNewPersonDialog = () => {
    setOpenDialg(true);
  };

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

  const getAllVolunteers = async () => {
    const response = await axiosPrivate
      .get(`${variables.VOLUNTEER_URL}`, {
        params: {
          Name: filterName == "" ? null : filterName,
          IDDepartment: idDepartment == "all" ? null : idDepartment,
          Role: role == -1 ? null : role,
          IsActive: isActive,
          PageSize: rowsPerPage,
          PageNumber: page,
        },
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
    const sortedVoluntersList = sortList(response.data, "FullName");
    dispatch(setVolunteers(sortedVoluntersList));

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    getAllVolunteers();
  }, [
    state.newPersonVolunteer,
    filterName,
    idDepartment,
    role,
    isActive,
    page,
    rowsPerPage,
    tableCount,
  ]);

  useEffect(() => {
    setTableCount(state.volunteer.volunteers.length);
  }, [state.volunteer.volunteers]);

  /** User Profile Functions **/
  const getSelectedPersonVolunteer = async (volunteer) => {
    await axiosPrivate
      .get(`${variables.PERSON_VOLUNTEER_URL}/${volunteer.IDPerson}`)
      .then((response) => {
        var obj = response.data;
        dispatch(setSelectedPerson(obj.Person));
        dispatch(setSelectedVolunteer(obj.Volunteer));
        dispatch(setSelectedVolunteerAvailability(obj.VolunteerAvailability));
        dispatch(setSelectedEmergencyContact(obj.EmergencyContact));
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const openUserProfile = async (volunteer) => {
    await getSelectedPersonVolunteer(volunteer);
    navigate(`/${variables.USER_PROFILE_URL}`);
  };

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
            VOLUNTARIOS
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
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
          display={"flex"}
          //flexWrap={"nowrap"}
          direction={{
            xxs: "column",
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          }}
          mb={2}
          px={1}
        >
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={isMediumScreen ? 12 : 3}
            lg={3}
            xl={2}
            p={2}
            width={"100%"}
            justifyContent={"flex-end"}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <SearchBar
              value={filterName}
              onChange={(e) => handleFilterByName(e)}
              placeholder={"Buscar por Nombre"}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={isMediumScreen ? 6 : 2}
            lg={2}
            xl={2}
            sx={{
              pl: { md: isMediumScreen ? 0 : 3, lg: 4, xl: 4 },
              pr: { md: isMediumScreen ? 0 : 2, lg: 2 },
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
            md={isMediumScreen ? 6 : 2}
            lg={2}
            xl={2}
            sx={{
              px: { md: 2, lg: 2, xl: 2 },
              pr: { md: isMediumScreen ? 0 : 2, lg: 2 },
            }}
          >
            <FormField
              required={true}
              select={true}
              label={"Rol"}
              name={"role"}
              defaultValue={-1}
              onChange={(event) => setRole(event.target.value)}
            >
              {volunteerVariables.VOLUNTEER_ROLES.map((rol) => (
                <MenuItem key={`transportType:${rol.name}`} value={rol.value}>
                  {rol.label}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={isMediumScreen ? 6 : 2}
            lg={2}
            xl={2}
            sx={{
              px: { md: isMediumScreen ? 0 : 2, lg: 2, xl: 2 },
            }}
          >
            <FormField
              required={true}
              select={true}
              label={"Estado"}
              name={"isActive"}
              defaultValue={true}
              onChange={(event) => setIsActive(event.target.value)}
            >
              <MenuItem key={`active`} value={true} defaultChecked>
                {"Activo"}
              </MenuItem>
              <MenuItem key={`inactive`} value={false}>
                {"Inactivo"}
              </MenuItem>
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={isMediumScreen ? 6 : 2}
            lg={2}
            xl={3}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            p={2}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <Fab
              color="primary"
              variant="extended"
              size="large"
              onClick={openNewPersonDialog}
            >
              <AddIcon sx={{ mr: 1 }} />
              {isMediumScreen ? "Registrar" : "Crear Voluntario"}
            </Fab>
          </Grid>
        </Grid>
        <PersonVolunteerDialog
          isCreate
          isSignUp
          open={openDialog}
          setOpen={setOpenDialg}
          getVolunteers={getAllVolunteers}
        />
        <Grid
          container
          width="100%"
          display="flex"
          wrap="wrap"
          justifyItems={{
            xxs: "center",
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          }}
          justifyContent="space-between"
        >
          {state.volunteer.volunteers.map((volunteer) => (
            <Grid
              item
              key={volunteer.IdVolunteer}
              my={{ xxs: 1, xs: 1, sm: 2, md: 3, lg: 3 }}
              px={{ xxs: 1, xs: 1, sm: 2 }}
              sx={{ cursor: "pointer" }}
              display={"flex"}
              justifyContent={{
                xxs: "center",
                xs: "center",
                sm: "flex-end",
                md: "flex-end",
                lg: "flex-end",
                xl: "flex-end",
              }}
              xxs={12}
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
            >
              <VolunteerCard
                props={volunteer}
                departments={state.department.departments}
                onClick={() => openUserProfile(volunteer)}
              />
            </Grid>
          ))}
        </Grid>
        {isNotFound && (
          <Box my={4}>
            <Typography variant="h5" display={"flex"} justifyContent={"center"}>
              No se encontraron resultados &nbsp;
            </Typography>
          </Box>
        )}
        <Grid container>
          <TablePaginator
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteersPage;
