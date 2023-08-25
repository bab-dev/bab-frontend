import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Fab, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import PendingTransportRequestTable from "components/tables/coordinator/PendingTransportRequestTable";
import AllTransportRequestsTable from "components/tables/coordinator/AllTransportRequestsTable";

import {
  headCellsCoordinatorView,
  headCellsEditableCoordinatorView,
} from "variables/transportVariables";
import theme from "theme";

const TransportPageCoordinatorView = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const userFullName = state.user.fullName;

  return (
    <Box px="calc(10% - 5px)" py="calc(5% - 5px)">
      <Grid container direction={"column"} display={"flex"} flexWrap={"nowrap"}>
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
              TRANSPORTE
            </Typography>{" "}
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent={"flex-start"}
          sx={{
            px: { md: 8, lg: 8, xl: 8 },
            mb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4, xl: 6 },
            my: { xxs: 2, xs: 3, sm: 3, md: 4, lg: 4, xl: 4 },
          }}
        >
          <Typography variant="h5">Solicitudes Pendientes</Typography>
        </Grid>
        <PendingTransportRequestTable
          userFullName={userFullName}
          headCells={headCellsCoordinatorView}
        />
        <Grid
          container
          item
          justifyContent={"flex-start"}
          sx={{
            px: { md: 8, lg: 8, xl: 8 },
            mb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4, xl: 4 },
          }}
        >
          <Typography variant="h5">Registro Histórico</Typography>
        </Grid>
        <AllTransportRequestsTable
          isEditable
          userFullName={userFullName}
          headCells={headCellsEditableCoordinatorView}
        />
      </Grid>
    </Box>
  );
};

export default TransportPageCoordinatorView;
