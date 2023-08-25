import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import theme from "theme";
import LogoBAB from "../img/logoBAB2.png";
import IsotypeBAB from "../img/isotypeBAB.png";

import { destroySession } from "actions/signOutActions";
import { signOut } from "actions/userActions";

import { stringAvatar } from "helpers/avatarHelper";
import {
  setSelectedEmergencyContact,
  setSelectedPerson,
  setSelectedVolunteer,
  setSelectedVolunteerAvailability,
} from "actions/selectedPersonVolunteerActions";
import { variables } from "variables";

const NavBar = ({ userFullName, volunteerRole }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserProfile = () => {
    setAnchorElUser(null);
    dispatch(setSelectedPerson(state.user.userData.Person));
    dispatch(setSelectedVolunteer(state.user.userData.Volunteer));
    dispatch(
      setSelectedVolunteerAvailability(
        state.user.userData.VolunteerAvailability
      )
    );
    dispatch(setSelectedEmergencyContact(state.user.userData.EmergencyContact));
    navigate(`${variables.USER_PROFILE_URL}`);
  };

  const signOff = () => {
    setAnchorElUser(null);
    dispatch(destroySession());
    dispatch(signOut());
    navigate("/");
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar disableGutters>
        <Grid
          container
          direction="row"
          alignItems="center"
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ py: 2 }}
          px={{ xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 }}
        >
          <Grid
            container
            item
            display={"flex"}
            justifyContent={"flex-start"}
            width={"auto"}
          >
            <Grid
              item
              sx={{
                display: {
                  xxs: "none",
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                },
              }}
            >
              <img
                src={LogoBAB}
                style={{
                  maxWidth: "30%",
                  height: "auto",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
                alt="Logo Banco de Alimentos de Bolivia"
                onClick={() => navigate(`/${variables.HOME_URL}`)}
              />
            </Grid>
            <Grid
              container
              item
              flex-wrap="nowrap"
              sx={{
                display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
                width: "auto",
                flexGrow: 1,
              }}
            >
              <IconButton
                size="medium"
                style={{ pl: 0, pt: 0 }}
                onClick={() => navigate(`/${variables.HOME_URL}`)}
              >
                <Avatar
                  alt="Isotipo Banco de Alimentos de Bolivia"
                  sx={{ width: 32, height: 32 }}
                  src={IsotypeBAB}
                />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item display="flex" flex-grow="1">
            <Grid
              container
              direction="column"
              px={2}
              sx={{
                display: {
                  xxs: "none",
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                },
              }}
            >
              <Grid container item justifyContent="flex-end">
                <Typography variant="subtitle2">
                  {userFullName ? userFullName : NavBar.defaultProps.userName}
                </Typography>
              </Grid>
              <Grid item display="flex" justifyContent="flex-end">
                <Typography variant="subtitle2" fontWeight={"bold"}>
                  {volunteerRole !== "" ? volunteerRole : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid item justifyContent={"flex-end"}>
              <Tooltip title="Abrir Configuración">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    {...stringAvatar(
                      userFullName !== ""
                        ? userFullName
                        : NavBar.defaultProps.userName,
                      true
                    )}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: 7 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="profile"
                  onClick={handleOpenUserProfile}
                  sx={{
                    ":hover": {
                      bgcolor: `${theme.palette.secondary.light}`,
                      borderRadius: "0.7rem",
                    },
                    m: { xs: 1, sm: 1, md: 2, lg: 2 },
                    p: 1,
                    display: "flex",
                  }}
                >
                  <PersonOutlineOutlinedIcon size="medium" sx={{ mr: 1 }} />
                  <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                <MenuItem
                  key="logOut"
                  onClick={signOff}
                  sx={{
                    ":hover": {
                      bgcolor: `${theme.palette.secondary.light}`,
                      borderRadius: "0.7rem",
                    },
                    m: { xs: 1, sm: 1, md: 2, lg: 2 },
                    p: 1,
                    display: "flex",
                  }}
                >
                  <LogoutOutlinedIcon size="medium" sx={{ mr: 1 }} />
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
NavBar.propTypes = {
  userFullName: PropTypes.string,
  volunteerRole: PropTypes.string,
};

NavBar.defaultProps = {
  userFullName: "Usuario Test",
  volunteerRole: "Volunteer",
};

export default NavBar;
