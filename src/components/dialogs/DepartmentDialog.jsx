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
import DepartmentForm from "components/forms/DepartmentForm.jsx";

const DepartmentDialog = ({
  isCreate,
  isUpdate,
  existingDepartment,
  open,
  setOpen,
  getDepartments,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const createDepartment = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.DEPARTMENT_URL,
          JSON.stringify({
            departmentName: values.departmentName,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getDepartments();
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

  const updateDepartment = async (values) => {
    if (existingDepartment) {
      await axiosPrivate
        .put(
          `${variables.DEPARTMENT_URL}/${existingDepartment.Id}`,
          JSON.stringify({
            departmentName: values.departmentName,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getDepartments();
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
        <DepartmentForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          existingDepartment={existingDepartment}
          onCancelClick={() => setOpen(false)}
          onCreateSubmitFunction={createDepartment}
          onUpdateSubmitFunction={updateDepartment}
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

DepartmentDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingDepartment: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getAllCompanies: PropTypes.func,
};

export default DepartmentDialog;
