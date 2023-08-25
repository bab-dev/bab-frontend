import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Card, CardContent, Fab, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { styled } from "@mui/material/styles";

import UserDetails from "components/user/UserDetails";
import AccountDetailsForm from "components/forms/AccountDetailsForm";
import PersonVolunteerDialog from "components/dialogs/PersonVolunteerDialog";
import theme from "theme";

const StyledAccountDetailsCard = styled(Card)(() => ({
  borderRadius: 15,
  //width: "100%",
  minWidth: "200px",
  margin: 0,
  position: "relative",
  height: "auto",
  boxShadow: "0 2px 6px 0 #000000",
}));

const UserProfile = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const [openDialog, setOpenDialg] = useState(false);

  const [selectedPersonVolunteer, setSelectedPersonVolunteer] = useState(
    state.selectedPersonVolunteer ? state.selectedPersonVolunteer : null
  );

  useEffect(() => {
    setSelectedPersonVolunteer(state.selectedPersonVolunteer);
  }, [state.selectedPersonVolunteer]);

  return (
    <Box px="calc(10% - 10px)" py="calc(5% - 5px)">
      <Grid container direction={"column"}>
        <Grid
          container
          item
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          sx={{
            pb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
            mt: 1,
          }}
        >
          <Grid
            container
            item
            alignItems={"center"}
            justifyContent={"flex-start"}
            xxs={12}
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
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
                PERFIL DE USUARIO
              </Typography>{" "}
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyItems={"flex-end"}
            justifyContent={"flex-end"}
            sx={{
              p: 2,
              pl: 0,
              pr: { xxs: 0, xs: 0, sm: 0, md: 4, lg: 9 },
            }}
            xxs={12}
            xs={12}
            sm={6}
            md={6}
            lg={6}
          >
            <Fab
              color="primary"
              variant="extended"
              size="large"
              onClick={() => setOpenDialg(true)}
            >
              <OpenInNewIcon sx={{ mr: 1 }} />
              Modificar
            </Fab>
          </Grid>
          <PersonVolunteerDialog
            isUpdate
            existingPersonVolunteer={selectedPersonVolunteer}
            open={openDialog}
            setOpen={setOpenDialg}
          />
        </Grid>
        <Grid
          container
          item
          display={"flex"}
          justifyContent={"space-between"}
          px="calc(5% - 10px)"
        >
          <Grid
            container
            item
            display="flex"
            direction="column"
            justifyItems={{ lg: "center" }}
            width={"100%"}
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            sx={{
              pr: { xxs: 0, xs: 0, sm: 0, md: 8, lg: 10 },
              mb: { xxs: 4, xs: 4 },
            }}
          >
            <UserDetails />
          </Grid>
          <Grid
            container
            item
            display={"flex"}
            justifyItems={"center"}
            direction={"column"}
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
          >
            <Grid item mb={4}>
              <StyledAccountDetailsCard>
                <CardContent
                  sx={{
                    minWidth: "200px",
                  }}
                >
                  <AccountDetailsForm />
                </CardContent>
              </StyledAccountDetailsCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
