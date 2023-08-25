import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";
import HomeCard from "components/cards/HomeCard";
import { variables } from "../variables";

import BeneficiariesImage from "../img/beneficiaries.jpg";
import SuppliersImage from "../img/supplier.jpg";
import VolunteersImage from "../img/volunteers.jpg";
import TruckImage from "../img/truck.jpg";
import AttendanceImage from "../img/attendance.jpg";
import TransportImage from "../img/transport2.jpg";
import TransportingDonationsImage from "../img/transportDonations.jpg";
import FoodSelectionImage from "../img/pickUpDonation.jpg";
import DepartmentImage from "../img/departments.jpg";
import MarketImage from "../img/market.jpg";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { sortList } from "helpers/sortingHelper";

import { setVolunteers } from "actions/volunteerActions.js";
import { setCompanies } from "actions/companyActions.js";
import { setVolunteerAssignedEvents } from "actions/eventActions";
import { setMarkets } from "actions/marketActions";
import { setBeneficiaryOrganizations } from "actions/beneficiaryOrganizationsActions";
import { setTrips } from "actions/tripsActions";
import theme from "theme";

const Home = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const isAdmin = state.user.userRole == variables.USER_ROLES.ADMIN;

  const getVolunteersFromDB = async () => {
    await axiosPrivate
      .get(variables.VOLUNTEER_URL)
      .then((response) => {
        const sortedVoluntersList = sortList(response.data, "FullName");
        dispatch(setVolunteers(sortedVoluntersList));
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const getCompaniesFromDB = async () => {
    await axiosPrivate
      .get(variables.COMPANY_URL)
      .then((response) => {
        dispatch(setCompanies(response.data));
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const getMarketsFromDB = async () => {
    await axiosPrivate
      .get(variables.MARKET_URL)
      .then((response) => {
        dispatch(setMarkets(response.data));
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const getTripsFromDB = async () => {
    await axiosPrivate
      .get(variables.TRIP_URL)
      .then((response) => {
        dispatch(setTrips(response.data));
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const getBeneficiaryOrganizationsFromDB = async () => {
    await axiosPrivate
      .get(variables.BENEFICIARY_ORGANIZATION_URL)
      .then((response) => {
        dispatch(setBeneficiaryOrganizations(response.data));
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const getEventsByIdVolunteerFromDB = async () => {
    await axiosPrivate
      .get(
        `${variables.EVENT_VOLUNTEER_URL}/${variables.VOLUNTEER_URL}/${state.user.userData.Volunteer.Id}/${variables.EVENT_URL}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          dispatch(setVolunteerAssignedEvents(response.data));
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
    getVolunteersFromDB();
    getCompaniesFromDB();
    getMarketsFromDB();
    getBeneficiaryOrganizationsFromDB();
    getTripsFromDB();
    getEventsByIdVolunteerFromDB();
  }, []);

  return (
    <Box px="calc(10% - 10px)" py="calc(5% - 10px)" height={"auto"}>
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
          pt: 3,
          textShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Bienvenid@, {state.user.userData.Person.FirstName}!
      </Typography>
      <Grid
        container
        item
        height={"100%"}
        alignItems="center"
        justify="center"
        justifyContent={"space-around"}
        spacing={3}
        my={{ xxs: 2, xs: 2, sm: 3, md: 6 }}
      >
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Beneficiaries"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Beneficiarios"}
              imageURL={BeneficiariesImage}
              onClick={() => navigate(`/${variables.BENEFICIARIES_URL}`)}
            />
          </Grid>
        )}
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Suppliers"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Proveedores"}
              imageURL={SuppliersImage}
              onClick={() => navigate(`/${variables.SUPPLIER_URL}`)}
            />
          </Grid>
        )}
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Volunteers"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Voluntarios"}
              imageURL={VolunteersImage}
              onClick={() => navigate(`/${variables.VOLUNTEER_URL}`)}
            />
          </Grid>
        )}
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Transport"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Solicitudes Transporte"}
              imageURL={TruckImage}
              onClick={() =>
                navigate(`/${variables.TRANSPORT_COORDINATOR_VIEW}`)
              }
            />
          </Grid>
        )}
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"TransportDirectorView"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Logística Transporte"}
              imageURL={TransportImage}
              onClick={() => navigate(`/${variables.TRANSPORT__URL}`)}
            />
          </Grid>
        )}
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Trips"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Viajes"}
              imageURL={TransportingDonationsImage}
              onClick={() => navigate(`/${variables.TRIP_URL}`)}
            />
          </Grid>
        )}
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Attendance"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Asistencia"}
              imageURL={AttendanceImage}
              onClick={() => navigate(`/${variables.ATTENDANCE_URL}`)}
            />
          </Grid>
        )}
        <Grid
          item
          xxs={6}
          xs={6}
          sm={4}
          md={4}
          lg={3}
          xl={3}
          key={"Activities"}
          p={{ xs: 1, sm: 2, md: 3 }}
        >
          <HomeCard
            title={"Actividades"}
            imageURL={FoodSelectionImage}
            onClick={() => navigate(`/${variables.CALENDAR_URL}`)}
          />
        </Grid>
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Departments"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Departamentos"}
              imageURL={DepartmentImage}
              onClick={() => navigate(`/${variables.DEPARTMENT_URL}`)}
            />
          </Grid>
        )}
        {isAdmin && (
          <Grid
            item
            xxs={6}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            key={"Markets"}
            p={{ xs: 1, sm: 2, md: 3 }}
          >
            <HomeCard
              title={"Mercados"}
              imageURL={MarketImage}
              onClick={() => navigate(`/${variables.MARKET_URL}`)}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
