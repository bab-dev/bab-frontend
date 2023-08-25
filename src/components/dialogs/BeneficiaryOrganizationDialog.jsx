import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import BeneficiaryOrganizationForm from "components/forms/BeneficiaryOrganizationForm";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "variables";
import { parseDate } from "helpers/dateHelper";

const BeneficiaryOrganizationDialog = ({
  isCreate,
  isUpdate,
  open,
  setOpen,
  existingOrganization,
  onCancelClick,
  getBeneficiaryOrganizations,
}) => {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const createBeneficiaryOrganization = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.BENEFICIARY_ORGANIZATION_URL,
          JSON.stringify({
            idCoordinator: values.idCoordinator,
            organizationName: values.organizationName,
            organizationType: values.organizationType,
            program: values.program,
            contractStartDate: parseDate(values.contractStartDate),
            contractEndDate: parseDate(values.contractEndDate),
            legalRepresentative: values.legalRepresentative,
            address: values.address,
            phoneNumber: values.phoneNumber,
            totalPopulation: values.totalPopulation,
            observations: values.observations,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getBeneficiaryOrganizations();
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

  const updateBeneficiaryOrganization = async (values) => {
    try {
      await axiosPrivate
        .put(
          `${variables.BENEFICIARY_ORGANIZATION_URL}/${existingOrganization.Id}`,
          JSON.stringify({
            idCoordinator: values.idCoordinator,
            organizationName: values.organizationName,
            organizationType: values.organizationType,
            program: values.program,
            contractStartDate: parseDate(values.contractStartDate),
            contractEndDate: parseDate(values.contractEndDate),
            legalRepresentative: values.legalRepresentative,
            address: values.address,
            phoneNumber: values.phoneNumber,
            totalPopulation: values.totalPopulation,
            observations: values.observations,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getBeneficiaryOrganizations();
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

  const closeDialogs = () => {
    setShowErrorAlert(false);
    setShowCreatedAlert(false);
    setShowUpdatedAlert(false);
    setOpen(false);
    onCancelClick();
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"lg"}>
      <DialogActions sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <IconButton aria-label="Cerrar" onClick={closeDialogs}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <BeneficiaryOrganizationForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          existingOrganization={existingOrganization}
          showErrorAlert={showErrorAlert}
          showCreatedAlert={showCreatedAlert}
          showUpdatedAlert={showUpdatedAlert}
          onCancelClick={closeDialogs}
          closeDialogs={closeDialogs}
          onCreateSubmitFunction={createBeneficiaryOrganization}
          onUpdateSubmitFunction={updateBeneficiaryOrganization}
        />
      </DialogContent>
    </Dialog>
  );
};

BeneficiaryOrganizationDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingOrganization: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.func,
  getBeneficiaryOrganizations: PropTypes.func,
};

BeneficiaryOrganizationDialog.defaultProps = {
  isCreate: false,
  isUpdate: false,
  open: false,
};

export default BeneficiaryOrganizationDialog;
