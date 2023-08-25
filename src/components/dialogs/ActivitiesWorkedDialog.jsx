import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { variables } from "variables.js";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { getActualDate, getActualTime } from "helpers/dateHelper.js";

import FormActions from "components/FormActions";
import { eventVariables } from "variables/eventVariables";

const ActivitiesWorkedDialog = ({
  open,
  setOpen,
  idVolunteer,
  onCancelClick,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);

  const createClockOut = async () => {
    try {
      await axiosPrivate
        .put(
          `${variables.CLOCKING_URL}/${idVolunteer}/${variables.CLOCKOUT_URL}`,
          JSON.stringify({
            clockOutTime: getActualTime(),
            date: getActualDate(),
            eventTypesWorkedOn: selectedEventTypes,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            setShowErrorAlert(true);
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedEventTypes((prev) => [...prev, id]);
    } else {
      setSelectedEventTypes((prev) => prev.filter((i) => i !== id));
    }
  };

  const closeAllDialogs = () => {
    setShowCreatedAlert(false);
    setShowErrorAlert(false);
    onCancelClick();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogActions sx={{ pt: 2, pr: 3, pb: 0 }}>
        <IconButton aria-label="Cerrar" onClick={() => setOpen(false)}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle sx={{ mx: 3 }}>¿En qué áreas ayudaste hoy?</DialogTitle>
      <DialogContent>
        <Grid container sx={{ p: 3 }}>
          {eventVariables.EVENT_TYPE.map((type) => (
            <Grid
              item
              xxs={12}
              xs={12}
              sm={6}
              md={6}
              lg={6}
              key={type.name}
              width={"100%"}
              sx={{ pr: { xxs: 0, xs: 0, sm: 0 } }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      handleCheckboxChange(type.value, event.target.checked)
                    }
                  />
                }
                label={type.label}
              />
            </Grid>
          ))}
        </Grid>
        <FormActions
          isCreate
          isSignUp
          onClickonCancelClick={onCancelClick}
          onClickSubmit={createClockOut}
          showErrorAlert={showErrorAlert}
          handleShowErrorAlert={closeAllDialogs}
          showCreatedAlert={showCreatedAlert}
          handleShowCreatedAlert={closeAllDialogs}
        />
      </DialogContent>
    </Dialog>
  );
};

ActivitiesWorkedDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.any,
  onCancelClick: PropTypes.func,
  onCreateSubmitFunction: PropTypes.func,
};
export default ActivitiesWorkedDialog;
