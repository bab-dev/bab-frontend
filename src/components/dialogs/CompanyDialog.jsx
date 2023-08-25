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
import CompanyForm from "components/forms/CompanyForm.jsx";

const CompanyDialog = ({
  isCreate,
  isUpdate,
  existingCompany,
  open,
  setOpen,
  getAllCompanies,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const createCompany = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.COMPANY_URL,
          JSON.stringify({
            companyComercialName: values.companyComercialName,
            address: values.address,
            businessName: values.businessName,
            representative: values.representative,
            representativePosition: values.representativePosition,
            phoneNumber: values.phoneNumber,
            email: values.email,
            imageURL: values.imageURL,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getAllCompanies();
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

  const updateCompany = async (values) => {
    if (existingCompany) {
      await axiosPrivate
        .put(
          `${variables.COMPANY_URL}/${existingCompany.Id}`,
          JSON.stringify({
            companyComercialName: values.companyComercialName,
            address: values.address,
            businessName: values.businessName,
            representative: values.representative,
            representativePosition: values.representativePosition,
            phoneNumber: values.phoneNumber,
            email: values.email,
            imageURL: values.imageURL,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getAllCompanies();
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
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogActions sx={{ pt: 2, pr: 2, pb: 0 }}>
        <IconButton aria-label="Cerrar" onClick={() => setOpen(false)}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>

      <DialogContent sx={{ p: 0 }}>
        <CompanyForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          existingCompany={existingCompany}
          onCancelClick={() => setOpen(false)}
          onCreateSubmitFunction={createCompany}
          onUpdateSubmitFunction={updateCompany}
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

CompanyDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingCompany: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getAllCompanies: PropTypes.func,
};

export default CompanyDialog;
