import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Fab, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DetailCard from "components/cards/DetailCard.jsx";

import { variables } from "variables";
import theme from "theme";
const SuppliersPage = () => {
  const navigate = useNavigate();

  return (
    <Box px="calc(10% - 10px)" py="calc(5% - 5px)" height="100vh" flexGrow={1}>
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
            PROVEEDORES
          </Typography>{" "}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-evenly"
        display={"flex"}
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
      >
        <Grid
          item
          width={"100%"}
          display={"flex"}
          justifyContent="center"
          xxs={12}
          xs={6}
          sm={3}
          md={3}
          lg={3}
          sx={{ m: { xxs: 1, xs: 1, sm: 1 } }}
        >
          <DetailCard
            isClickable
            isIconCard
            isCompanyCard
            subtitle="Empresas"
            onClick={() => navigate(`/${variables.COMPANY_URL}`)}
          />
        </Grid>
        <Grid
          item
          width={"100%"}
          display={"flex"}
          justifyContent="center"
          xxs={12}
          xs={6}
          sm={3}
          md={3}
          lg={3}
          sx={{ m: { xxs: 1, xs: 1, sm: 1 } }}
        >
          <DetailCard
            isClickable
            isIconCard
            isMarketSellersCard
            subtitle="Comerciantes"
            onClick={() => navigate(`/${variables.MARKET_SELLER_URL}`)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuppliersPage;
