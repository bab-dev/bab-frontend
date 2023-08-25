import React from "react";
import { useSelector } from "react-redux";

import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import theme from "../../theme.js";
import { getFullName, getRoleName } from "helpers/parseNameHelper.js";
import { stringAvatar } from "helpers/avatarHelper.js";

const StyledUserDetailsCard = styled(Card)(() => ({
  borderRadius: 15,
  width: "100%",
  margin: 0,
  position: "relative",
  boxShadow: "0 2px 6px 0 #000000",
  alignSelf: "center",
  justifyContent: "center",
}));

const useStyles = makeStyles(() => ({
  largeAvatar: {
    height: theme.spacing(16),
    width: theme.spacing(16),
  },
}));

const UserDetails = () => {
  const state = useSelector((state) => state);
  const classes = useStyles();
  return (
    <StyledUserDetailsCard
      sx={{
        maxWidth: "360px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <CardMedia
        sx={{
          backgroundColor: "white",
          mx: "auto",
          mt: theme.spacing(4),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          className={classes.largeAvatar}
          alt={getFullName(state.selectedPersonVolunteer.selectedPerson)}
          {...stringAvatar(
            `${state.selectedPersonVolunteer.selectedPerson.FirstName} ${state.selectedPersonVolunteer.selectedPerson.FirstSurname}`,
            false
          )}
        />
      </CardMedia>

      <CardContent p={theme.spacing(2)} pt={theme.spacing(0)}>
        <Grid container display={"flex"} direction={"column"}>
          <Grid item>
            <Typography variant="h6" align="center" fontWeight={"bold"}>
              {state.selectedPersonVolunteer != null
                ? getFullName(state.selectedPersonVolunteer.selectedPerson)
                : ""}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" align="center">
              {state.selectedPersonVolunteer != null
                ? getRoleName(
                    state.selectedPersonVolunteer.selectedVolunteer.Role
                  )
                : ""}
            </Typography>
          </Grid>
          <Grid>
            <Typography
              variant="subtitle2"
              align="center"
              m={theme.spacing(0, 0, 1)}
            >
              {state.selectedPersonVolunteer != null
                ? state.selectedPersonVolunteer.selectedPerson.Age
                : ""}
              {" años"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </StyledUserDetailsCard>
  );
};

export default UserDetails;
