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
import MarketSellerForm from "components/forms/MarketSellerForm.jsx";

const MarketSellerDialog = ({
  isCreate,
  isUpdate,
  existingMarketSeller,
  open,
  setOpen,
  onCancelClick,
  getMarketSellers,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const createMarketSeller = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.MARKET_SELLER_URL,
          JSON.stringify({
            name: values.name,
            lastName: values.lastName,
            marketName: values.marketName,
            phoneNumber: values.phoneNumber,
            idProductCategory: values.idProductCategory,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getMarketSellers();
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

  const updateMarketSeller = async (values) => {
    if (existingMarketSeller) {
      await axiosPrivate
        .put(
          `${variables.MARKET_SELLER_URL}/${existingMarketSeller.Id}`,
          JSON.stringify({
            Name: values.name,
            LastName: values.lastName,
            MarketName: values.marketName,
            PhoneNumber: values.phoneNumber,
            IDProductCategory: values.idProductCategory,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getMarketSellers();
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
    onCancelClick();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogActions sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <IconButton aria-label="Cerrar" onClick={closeDialogs}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <MarketSellerForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          existingMarketSeller={existingMarketSeller}
          showErrorAlert={showErrorAlert}
          showCreatedAlert={showCreatedAlert}
          showUpdatedAlert={showUpdatedAlert}
          onCancelClick={closeDialogs}
          closeDialogs={closeDialogs}
          onCreateSubmitFunction={createMarketSeller}
          onUpdateSubmitFunction={updateMarketSeller}
        />
      </DialogContent>
    </Dialog>
  );
};

MarketSellerDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingMarketSeller: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.any,
  getMarketSellers: PropTypes.func,
};

MarketSellerDialog.defaultProps = {
  isCreate: false,
  isUpdate: false,
  open: false,
};

export default MarketSellerDialog;
