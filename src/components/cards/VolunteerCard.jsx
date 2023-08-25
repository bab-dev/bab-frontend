import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import theme from "../../theme.js";
import { stringAvatar } from "helpers/avatarHelper";
import { getRoleName } from "helpers/parseNameHelper.js";
import { formatDateWithBackslash } from "helpers/dateHelper.js";

const StyledUserCard = styled(Card)(() => ({
  borderRadius: 15,
  height: "100%",
  margin: 0,
  position: "relative",
  transition: "transform 0.15s ease-in-out",
  boxShadow: `0 3px 8px 0 ${theme.palette.common.black}`,
  "&:hover": { boxShadow: `0 2px 16px 2px ${theme.palette.common.black}` },
}));

const useStyles = makeStyles(() => ({
  largeAvatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
  },
}));

const getDepartmentName = (departments, idDepartment) => {
  var department = departments.find(({ Id }) => Id === idDepartment);
  return department.DepartmentName;
};

const VolunteerCard = ({ props, departments, onClick }) => {
  const classes = useStyles();

  return (
    <StyledUserCard
      variant="outlined"
      onClick={onClick}
      sx={{
        maxWidth: "288px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            className={classes.largeAvatar}
            alt={props.FullName}
            {...stringAvatar(`${props.FirstName} ${props.FirstSurname}`, false)}
          />
        }
        sx={{
          backgroundColor: "white",
          mx: "auto",
          mt: theme.spacing(4),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        alt={props.FullName}
      />

      <CardContent p={theme.spacing(2)} pt={theme.spacing(0)}>
        <Grid container display={"flex"} direction={"column"}>
          <Grid item>
            <Typography
              color="textSecondary"
              variant="h6"
              align="center"
              fontWeight={"bold"}
              m={theme.spacing(0.5, 0, 0)}
            >
              {`${props.FirstName} ${props.FirstSurname}`}
            </Typography>
            <Grid item>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                align="center"
                m={theme.spacing(0, 0, 1)}
              >
                {getRoleName(props.RoleValue)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          px={{ xxs: 1, xs: 2, sm: 2, md: 2, lg: 3 }}
          display={"flex"}
          direction={"column"}
        >
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              width="100%"
              m={theme.spacing(0, 0, 0.5)}
            >
              <BadgeIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {getDepartmentName(departments, props.IDDepartment)}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              width="100%"
              m={theme.spacing(0, 0, 1)}
            >
              <LocationOnIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {props.City}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              noWrap={true}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              m={theme.spacing(0, 0, 0.5)}
            >
              <WorkIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {props.Occupation}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              m={theme.spacing(0, 0, 0.5)}
            >
              <CakeIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {formatDateWithBackslash(props.DateOfBirth)}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              noWrap={true}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              m={theme.spacing(0, 0, 0.5)}
            >
              <EmailIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {props.Email}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography color="textSecondary" variant="subtitle1" align="left">
              <PhoneIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {props.PhoneNumber}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </StyledUserCard>
  );
};

VolunteerCard.propTypes = {
  props: PropTypes.any,
  departments: PropTypes.array,
  onClick: PropTypes.func,
};

export default VolunteerCard;
