import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "variables";

import { Box, Fab, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import NewIncomingTransportRequestTable from "components/tables/director/NewIncomingTransportRequestTable";
import AllTransportRequestsTable from "components/tables/coordinator/AllTransportRequestsTable";
import DetailCard from "components/cards/DetailCard";

import {
  headCellsDirectorView,
  transportVariables,
} from "variables/transportVariables";
import theme from "theme";

const TransportPageDirectorView = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [allNewRequests, setAllNewRequests] = useState([]);
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [pickUpRequests, setPickUpRequests] = useState([]);

  useEffect(() => {
    const getAllNewTransportRequests = async () => {
      const response = await axiosPrivate
        .get(`${variables.TRANSPORT_REQUEST_URL}`, {
          params: {
            Status: transportVariables.REQUEST_STATUS.PENDING.value,
          },
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
      setAllNewRequests(response.data);
    };
    getAllNewTransportRequests();
  }, [state.transport.request]);

  useEffect(() => {
    const getAllNewTransportRequests = async () => {
      const response = await axiosPrivate
        .get(`${variables.TRANSPORT_REQUEST_URL}`, {
          params: {
            Status: transportVariables.REQUEST_STATUS.APPROVED.value,
            TransportType:
              transportVariables.REQUEST_TRANSPORT_TYPE.DELIVERY.value,
          },
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
      setDeliveryRequests(response.data);
    };
    getAllNewTransportRequests();
  }, [state.transport.request]);

  useEffect(() => {
    const getAllNewTransportRequests = async () => {
      const response = await axiosPrivate
        .get(`${variables.TRANSPORT_REQUEST_URL}`, {
          params: {
            Status: transportVariables.REQUEST_STATUS.APPROVED.value,
            TransportType:
              transportVariables.REQUEST_TRANSPORT_TYPE.PICK_UP.value,
          },
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
      setPickUpRequests(response.data);
    };
    getAllNewTransportRequests();
  }, [state.transport.request]);

  const goBack = () => {
    navigate(-1);
  };

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
            <Fab color="primary" onClick={() => goBack()} size="medium">
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
          display={"flex"}
          justifyContent="space-between"
          direction={{
            xxs: "column",
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
          }}
          sx={{
            flexWrap: {
              xxs: "wrap",
              xs: "wrap",
              sm: "nowrap",
              md: "nowrap",
              lg: "nowrap",
            },
          }}
          px="calc(8% - 10px)"
          my={{ xxs: 2, xs: 3, sm: 3, md: 4, lg: 4, xl: 4 }}
        >
          <Grid
            item
            display={{
              xxs: "none",
              xs: "none",
              sm: "flex",
              md: "flex",
              lg: "flex",
            }}
            justifyContent="flex-start"
            xxs={12}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            sx={{ m: { xxs: 1, xs: 1, sm: 1 } }}
          >
            <DetailCard
              title={allNewRequests ? allNewRequests.length.toString() : "0"}
              subtitle="Nuevas Solicitudes"
            />
          </Grid>
          <Grid
            item
            display={{
              xxs: "none",
              xs: "none",
              sm: "flex",
              md: "flex",
              lg: "flex",
            }}
            justifyContent="center"
            xxs={12}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            sx={{ m: { xxs: 1, xs: 1, sm: 1 } }}
          >
            <DetailCard
              title={allNewRequests ? deliveryRequests.length.toString() : "0"}
              subtitle="Entregas Pendientes"
            />
          </Grid>
          <Grid
            item
            width={"auto"}
            display={{
              xxs: "none",
              xs: "none",
              sm: "flex",
              md: "flex",
              lg: "flex",
            }}
            justifyContent="flex-end"
            xxs={12}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            sx={{ m: { xxs: 1, xs: 1, sm: 1 } }}
          >
            <DetailCard
              title={allNewRequests ? pickUpRequests.length.toString() : "0"}
              subtitle="Recojos Pendientes"
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent={"flex-start"}
          sx={{
            px: { md: 8, lg: 8 },
            mb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
            my: 4,
          }}
        >
          <Typography variant="h5">Nuevas Solicitudes</Typography>
        </Grid>
        <NewIncomingTransportRequestTable />
        <Grid
          container
          item
          justifyContent={"flex-start"}
          sx={{
            px: { md: 8, lg: 8 },
            mb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
            my: 4,
          }}
        >
          <Typography variant="h5">Registro Histórico</Typography>
        </Grid>
        <AllTransportRequestsTable
          isDirector
          isEditable
          headCells={headCellsDirectorView}
        />
      </Grid>
    </Box>
  );
};

export default TransportPageDirectorView;
