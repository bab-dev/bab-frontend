import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Fab, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AttendanceControlView from "./AttendanceControlView";
import VolunteerWorkStatisticsView from "./VolunteerWorkStatisticsView";
import theme from "theme";

const AttendancePage = () => {
  const navigate = useNavigate();

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
            ASISTENCIA
          </Typography>{" "}
        </Grid>
      </Grid>
      <AttendanceControlView />
      <VolunteerWorkStatisticsView />
    </Box>
  );
};

export default AttendancePage;
