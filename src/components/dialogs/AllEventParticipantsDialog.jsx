import React from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Grid,
  Typography,
  DialogTitle,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { stringAvatar } from "helpers/avatarHelper";

const AllEventParticipantsDialog = ({ open, setOpen, participants }) => {
  return (
    <Dialog open={open} fullWidth maxWidth={"xs"}>
      <DialogActions sx={{ p: { xxs: 1, xs: 1, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <IconButton aria-label="Cerrar" onClick={() => setOpen(false)}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle sx={{ pt: 0, mx: { xs: 0, sm: 1, md: 2, lg: 2, xl: 2 } }}>
        Participantes Asignados
      </DialogTitle>
      <DialogContent sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          display="flex"
          justifyContent={"space-around"}
          mx={{ xs: 0, sm: 1, md: 2, lg: 2, xl: 2 }}
        >
          {participants.map((volunteer) => {
            return (
              <Grid
                container
                item
                key={volunteer.IDVolunteer}
                display={"flex"}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <Grid item pr={2} py={1}>
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    alt={volunteer.FullName}
                    {...stringAvatar(volunteer.FullName, false)}
                  />
                </Grid>
                <Grid item py={2}>
                  <Typography>{volunteer.FullName}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        {participants.length <= 0 && (
          <Typography variant="body1" mx={2}>
            No hay participantes asignados a este evento &nbsp;
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

AllEventParticipantsDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  participants: PropTypes.array,
};

AllEventParticipantsDialog.defaultProps = {
  open: false,
};

export default AllEventParticipantsDialog;
