import React from "react";
import PropTypes from "prop-types";

import { Menu, MenuItem, Typography } from "@mui/material";
import theme from "theme";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ModifyMenu = ({
  openMenu,
  setOpenMenu,
  anchorEl,
  onUpdateClick,
  onDeleteClick,
}) => {
  return (
    <Menu
      sx={{ ml: 8, mt: 4 }}
      id="menu-modify"
      elevation={3}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={openMenu}
      onClose={() => setOpenMenu(false)}
    >
      <MenuItem
        key="update"
        onClick={onUpdateClick}
        sx={{
          ":hover": {
            bgcolor: `${theme.palette.secondary.light}`,
            borderRadius: "0.7rem",
          },
          mx: 1,
          display: "flex",
        }}
      >
        <EditIcon size="medium" sx={{ mr: 1 }} />
        <Typography textAlign="center">Actualizar</Typography>
      </MenuItem>
      <MenuItem
        key="delete"
        onClick={onDeleteClick}
        sx={{
          ":hover": {
            bgcolor: `${theme.palette.secondary.light}`,
            borderRadius: "0.7rem",
          },
          mx: 1,
          display: "flex",
        }}
      >
        <DeleteIcon size="medium" sx={{ mr: 1 }} />
        <Typography textAlign="center">Eliminar</Typography>
      </MenuItem>
    </Menu>
  );
};

ModifyMenu.propTypes = {
  openMenu: PropTypes.bool,
  setOpenMenu: PropTypes.func,
  anchorEl: PropTypes.any,
  onUpdateClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default ModifyMenu;
