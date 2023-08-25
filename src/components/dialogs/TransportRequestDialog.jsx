import { React, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import { variables } from "../../variables.js";
import TransportRequestForm from "components/forms/TransportRequestForm.jsx";
import { setSelectedTransportRequest } from "actions/transportActions.js";

const TransportRequestDialog = ({
  isCreate,
  isUpdate,
  isDirector,
  existingRequest,
  open,
  setOpen,
  getTransportRequests,
}) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const createTransportRequest = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.TRANSPORT_REQUEST_URL,
          JSON.stringify({
            idDepartment: values.idDepartment,
            idCoordinator: values.idCoordinator,
            transportType: values.transportType,
            placeType: values.placeType,
            idPlace: values.idPlace,
            date: values.date,
            timeRange: values.timeRange,
            detail: values.detail,
            observations: values.observations,
            priority: values.priority,
          })
        )
        .then((response) => {
          setShowCreatedAlert(true);
          getTransportRequests();
          dispatch(setSelectedTransportRequest(response.data));
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const updateTransportRequest = async (values) => {
    if (existingRequest) {
      await axiosPrivate
        .put(
          `${variables.TRANSPORT_REQUEST_URL}/${existingRequest.Id}`,
          JSON.stringify({
            idDepartment: values.idDepartment,
            idCoordinator: values.idCoordinator,
            transportType: values.transportType,
            placeType: values.placeType,
            idPlace: values.idPlace,
            date: values.date,
            timeRange: values.timeRange,
            detail: values.detail,
            observations: values.observations,
            priority: values.priority,
            status: values.status,
            commentByDirector: values.commentByDirector,
          })
        )
        .then((response) => {
          setShowCreatedAlert(true);
          getTransportRequests();
          dispatch(setSelectedTransportRequest(response.data));
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    }
  };

  const closeDialogs = () => {
    setShowErrorAlert(false);
    setShowCreatedAlert(false);
    setShowUpdatedAlert(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogActions sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <IconButton aria-label="Cerrar" onClick={closeDialogs}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ p: { xxs: 2, xs: 2, sm: 3, md: 3, lg: 3, xl: 3 } }}>
        <TransportRequestForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          isDirector={isDirector}
          existingRequest={existingRequest}
          showErrorAlert={showErrorAlert}
          showCreatedAlert={showCreatedAlert}
          showUpdatedAlert={showUpdatedAlert}
          onCancelClick={closeDialogs}
          closeDialogs={closeDialogs}
          onCreateSubmitFunction={createTransportRequest}
          onUpdateSubmitFunction={updateTransportRequest}
        />
      </DialogContent>
    </Dialog>
  );
};

TransportRequestDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isDirector: PropTypes.bool,
  existingRequest: PropTypes.object,
  setExistingRequest: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.func,
  getTransportRequests: PropTypes.func,
};

export default TransportRequestDialog;
