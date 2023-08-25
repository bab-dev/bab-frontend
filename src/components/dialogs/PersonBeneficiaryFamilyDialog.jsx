import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import PersonBeneficiaryFamilyForm from "components/forms/PersonBeneficiaryFamilyForm";
import { deleteNewPersonBeneficiaryData } from "actions/newBeneficiaryFamilyActions";

const PersonBeneficiaryFamilyDialog = ({
  isCreate,
  isUpdate,
  open,
  setOpen,
  existingBeneficiary,
  onClose,
  getBeneficiaryFamilies,
}) => {
  const dispatch = useDispatch();

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const closeDialogs = () => {
    setShowErrorAlert(false);
    setShowCreatedAlert(false);
    setShowUpdatedAlert(false);
    setOpen(false);
    onClose();

    // Delete new/updated data from beneficiary when cloding the dialog
    dispatch(deleteNewPersonBeneficiaryData());
  };
  return (
    <Dialog open={open} fullWidth maxWidth={"lg"}>
      <DialogActions sx={{ p: 4, pb: 1 }}>
        <IconButton aria-label="Cerrar" onClick={closeDialogs}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>

      <DialogContent sx={{ p: 3 }}>
        <PersonBeneficiaryFamilyForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          existingBeneficiary={existingBeneficiary}
          setOpen={setOpen}
          showErrorAlert={showErrorAlert}
          setShowErrorAlert={setShowErrorAlert}
          showCreatedAlert={showCreatedAlert}
          setShowCreatedAlert={setShowCreatedAlert}
          showUpdatedAlert={showUpdatedAlert}
          setShowUpdatedAlert={setShowUpdatedAlert}
          getBeneficiaryFamilies={getBeneficiaryFamilies}
        />
      </DialogContent>
    </Dialog>
  );
};

PersonBeneficiaryFamilyDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingBeneficiary: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleClose: PropTypes.func,
  getBeneficiaryFamilies: PropTypes.func,
};

PersonBeneficiaryFamilyDialog.defaultProps = {
  isCreate: false,
  isUpdate: false,
  open: false,
};

export default PersonBeneficiaryFamilyDialog;
