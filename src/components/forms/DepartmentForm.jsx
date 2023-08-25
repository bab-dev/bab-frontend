import { Box, Grid, Typography } from "@mui/material";

import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import DepartmentValidationSchema from "validationSchemas/departmentValidationSchema.js";

const DepartmentForm = ({
  isCreate,
  isUpdate,
  existingDepartment,
  showErrorAlert,
  handleShowErrorAlert,
  showCreatedAlert,
  handleShowCreatedAlert,
  showUpdatedAlert,
  handleShowUpdatedAlert,
  onCancelClick,
  onCreateSubmitFunction,
  onUpdateSubmitFunction,
  onDeleteSubmitFunction,
}) => {
  const [departmentName, setDepartmentName] = useState(
    existingDepartment ? existingDepartment.DepartmentName : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(DepartmentValidationSchema),
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  useEffect(() => {
    if (existingDepartment) {
      setDepartmentName(existingDepartment.DepartmentName);

      let defaults = {
        departmentName,
      };

      reset(defaults);
    }
  }, [existingDepartment, reset]);

  return (
    <Box
      p={2}
      sx={{ width: "100%", px: { xxs: 0, xs: 0, sm: 1, md: 2, lg: 2 } }}
    >
      <Box>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Departamento
        </Typography>
        <Grid container sx={{ width: "100%" }} direction={"column"}>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ px: 1, pt: 1, width: "100%" }}
          >
            <FormField
              required={true}
              type="text"
              label={"Nombre del Departamento BAB"}
              name={"departmentName"}
              value={departmentName}
              onChange={(event) => setDepartmentName(event.target.value)}
              error={!!errors["departmentName"]}
              helperText={getHelperText("departmentName")}
              inputProps={register("departmentName")}
            />
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isCreate={isCreate}
        isUpdate={isUpdate}
        isLastStep
        isSignUp
        showErrorAlert={showErrorAlert}
        handleShowErrorAlert={handleShowErrorAlert}
        showCreatedAlert={showCreatedAlert}
        handleShowCreatedAlert={handleShowCreatedAlert}
        showUpdatedAlert={showUpdatedAlert}
        handleShowUpdatedAlert={handleShowUpdatedAlert}
        onClickonCancelClick={onCancelClick}
        onClickSubmit={handleSubmit(onCreateSubmitFunction)}
        onUpdateClickSubmit={handleSubmit(onUpdateSubmitFunction)}
        onDeleteClickSubmit={handleSubmit(onDeleteSubmitFunction)}
      />
    </Box>
  );
};

DepartmentForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingDepartment: PropTypes.object,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  handleShowErrorAlert: PropTypes.func,
  handleShowCreatedAlert: PropTypes.func,
  handleShowUpdatedAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onCreateSubmitFunction: PropTypes.func,
  onUpdateSubmitFunction: PropTypes.func,
  onDeleteSubmitFunction: PropTypes.func,
};

DepartmentForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingDepartment: null,
};

export default DepartmentForm;
