import { React, useState } from "react";
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
import MarketForm from "components/forms/MarketForm.jsx";

const MarketDialog = ({
  isCreate,
  isUpdate,
  existingMarket,
  open,
  setOpen,
  getMarkets,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const createMarket = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.MARKET_URL,
          JSON.stringify({
            marketName: values.marketName,
            address: values.address,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getMarkets();
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

  const updateMarket = async (values) => {
    if (existingMarket) {
      await axiosPrivate
        .put(
          `${variables.MARKET_URL}/${existingMarket.Id}`,
          JSON.stringify({
            marketName: values.marketName,
            address: values.address,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getMarkets();
        })
        .catch((err) => {
          if (err.response) {
            setShowErrorAlert(true);
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
    <Dialog
      open={open}
      fullWidth
      maxWidth={"sm"}
      onClose={() => setOpen(false)}
    >
      <DialogActions sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <IconButton aria-label="Cerrar" onClick={() => setOpen(false)}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <MarketForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          existingMarket={existingMarket}
          onCancelClick={() => setOpen(false)}
          onCreateSubmitFunction={createMarket}
          onUpdateSubmitFunction={updateMarket}
          showErrorAlert={showErrorAlert}
          handleShowErrorAlert={closeDialogs}
          showCreatedAlert={showCreatedAlert}
          handleShowCreatedAlert={closeDialogs}
          showUpdatedAlert={showUpdatedAlert}
          handleShowUpdatedAlert={closeDialogs}
        />
      </DialogContent>
    </Dialog>
  );
};

MarketDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingMarket: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getAllCompanies: PropTypes.func,
};

export default MarketDialog;
