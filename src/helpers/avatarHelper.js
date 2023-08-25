import React from "react";
import theme from "theme";
import { getColor } from "helpers/colorHelper";

import { Avatar } from "@mui/material";
import { blue, green, orange, pink, purple, red } from "@mui/material/colors";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CleanHandsOutlinedIcon from "@mui/icons-material/CleanHandsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const stringAvatar = (name, isNavBarAvatar) => {
  const color = getColor(name);

  return {
    sx: {
      bgcolor: isNavBarAvatar ? `${theme.palette.primary.main}` : color,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const getAvatarByEventType = (eventType) => {
  switch (eventType) {
    case 0:
    case 1:
      return (
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: theme.palette.common.white,
            color: blue[800],
            boxShadow: 4,
          }}
        >
          <LocalShippingOutlinedIcon />
        </Avatar>
      );

    case 2:
      return (
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: theme.palette.common.white,
            color: green[400],
            boxShadow: 4,
          }}
        >
          <CheckBoxOutlinedIcon />
        </Avatar>
      );
    case 3:
      return (
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: theme.palette.common.white,
            color: orange[800],
            boxShadow: 4,
          }}
        >
          <FamilyRestroomOutlinedIcon />
        </Avatar>
      );
    case 4:
      return (
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: theme.palette.common.white,
            color: red[500],
            boxShadow: 4,
          }}
        >
          <CleanHandsOutlinedIcon />
        </Avatar>
      );
    case 5:
      return (
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: theme.palette.common.white,
            color: pink[400],
            boxShadow: 4,
          }}
        >
          <GroupsOutlinedIcon />
        </Avatar>
      );
    case 6:
      return (
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: theme.palette.common.white,
            color: purple[900],
            boxShadow: 4,
          }}
        >
          <EventOutlinedIcon />
        </Avatar>
      );
    default:
      return null;
  }
};
export { stringAvatar, getAvatarByEventType };
