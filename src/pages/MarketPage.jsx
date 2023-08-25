import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMediaQuery, Box, Fab, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import { variables } from "variables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import theme from "theme";

import MarketDialog from "components/dialogs/MarketDialog";
import MarketTable from "components/tables/MarketTable";
import { headCells } from "variables/marketVariables";

const MarketsPage = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialog] = useState(false);
  const [markets, setMarkets] = useState([]);

  const isMediumScreen = useMediaQuery("(max-width: 912px)");

  const getMarkets = async () => {
    const response = await axiosPrivate
      .get(`${variables.MARKET_URL}`)
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
    setMarkets(response.data);
  };

  useEffect(() => {
    getMarkets();
  }, []);

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
            MERCADOS
          </Typography>{" "}
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        flexWrap={"nowrap"}
        direction={"column"}
        px="calc(8% - 10px)"
      >
        <Grid
          container
          justifyContent={"flex-star"}
          justifyItems={"flex-start"}
          display={"flex"}
          flexWrap={"nowrap"}
        >
          <Fab
            color="primary"
            variant="extended"
            size="large"
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon sx={{ mr: 1 }} />
            {isMediumScreen ? "Registrar" : "Crear Mercado"}
          </Fab>
        </Grid>
        <Grid container display={"flex"} sx={{ my: 4 }}>
          <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} xl={6}>
            <MarketTable
              isEditable
              headCells={headCells}
              dataList={markets}
              onClose={() => setOpenDialog(false)}
              getMarkets={getMarkets}
            />
          </Grid>
        </Grid>
        <MarketDialog
          isCreate
          open={openDialog}
          setOpen={setOpenDialog}
          onCancelClick={() => setOpenDialog(false)}
          getMarkets={getMarkets}
        />
      </Grid>
    </Box>
  );
};

export default MarketsPage;
