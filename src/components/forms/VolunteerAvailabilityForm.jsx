import {
  Box,
  Checkbox,
  Grid,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";

import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";
import { variables } from "../../variables.js";
import volunteerAvailabilityValidationSchema from "validationSchemas/volunteerAvailabilityValidationSchema.js";

import FormActions from "../FormActions.jsx";

const VolunteerAvailabilityForm = ({
  isCreate,
  isUpdate,
  existingVolunteerAvailability,
  showAlert,
  handleHideAlert,
  onCancelClick,
  onSubmitFunction,
  onUpdateClickSubmit,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {},
    resolver: yupResolver(volunteerAvailabilityValidationSchema),
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const [formState, setFormState] = useState({});

  useEffect(() => {
    // Function to update the form values when existing data is provided
    const updateFormValues = (data) => {
      Object.keys(data).forEach((key) => {
        if (key.includes("IsAvailable")) {
          setValue(key, data[key]);
          setFormState((prevState) => ({ ...prevState, [key]: data[key] }));
        }
      });
    };

    // If existing data is provided, update the form values
    if (existingVolunteerAvailability) {
      updateFormValues(existingVolunteerAvailability);
    }
  }, [existingVolunteerAvailability]);

  const handleCheckboxChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box p={2} width={"100%"}>
      <Box>
        <Typography variant="h5">Disponibilidad</Typography>
        <Box sx={{ py: 2 }}>
          <Grid sx={{ pt: 2 }}>
            {variables.WEEKDAYS.map((weekDay) => (
              <FormControl
                fullWidth
                key={weekDay.value}
                component="fieldset"
                variant="standard"
                sx={{ pb: 2, justifyContent: "space-between" }}
              >
                <FormLabel
                  component="legend"
                  xxs={12}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                >
                  {weekDay.name}
                </FormLabel>
                <FormGroup
                  controlid="availability"
                  row
                  xxs={12}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{ justifyContent: "space-between" }}
                >
                  {variables.DAYTIMES.map((dayTime) => {
                    const name = `IsAvailable${weekDay.value}${dayTime.value}`;
                    const isChecked = formState[name];
                    return (
                      <FormControlLabel
                        key={`${weekDay.value}-${dayTime.value}`}
                        control={
                          <Checkbox
                            {...register(name)}
                            checked={isChecked || false}
                            onChange={(e) =>
                              handleCheckboxChange(name, e.target.checked)
                            }
                          />
                        }
                        label={`${dayTime.name}`}
                        xxs={12}
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            ))}
          </Grid>
        </Box>
      </Box>
      <FormActions
        isCreate={isCreate}
        isUpdate={isUpdate}
        showAlert={showAlert}
        handleHideAlert={handleHideAlert}
        onClickonCancelClick={onCancelClick}
        onClickSubmit={handleSubmit(onSubmitFunction)}
        onUpdateClickSubmit={handleSubmit(onUpdateClickSubmit)}
      />
    </Box>
  );
};

VolunteerAvailabilityForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingVolunteerAvailability: PropTypes.object,
  showAlert: PropTypes.bool,
  handleHideAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSubmitFunction: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
};

VolunteerAvailabilityForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingVolunteerAvailability: null,
};

export default VolunteerAvailabilityForm;
