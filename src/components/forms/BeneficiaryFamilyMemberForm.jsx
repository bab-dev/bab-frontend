import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import { getActualDate, parseDate } from "helpers/dateHelper.js";
import BeneficiaryFamilyMemberValidationSchema from "validationSchemas/beneficiaryFamilyMemberValidationSchema.js";

const BeneficiaryFamilyMemberForm = ({
  index,
  isLastStep,
  isRemovable,
  existingMember,
  showErrorAlert,
  handleShowErrorAlert,
  showCreatedAlert,
  handleShowCreatedAlert,
  showUpdatedAlert,
  handleShowUpdatedAlert,
  onCancelClick,
  saveNewMember,
  onSubmitFunction,
  onUpdateClickSubmit,
}) => {
  const [dateOfBirth, setDateOfBirth] = useState(
    existingMember.DateOfBirth
      ? parseDate(existingMember.DateOfBirth)
      : getActualDate()
  );
  const [gender, setGender] = useState(
    existingMember.Gender ? existingMember.Gender : "F"
  );
  const [hasDisability, setHasDisability] = useState(
    existingMember.HasDisability ? existingMember.HasDisability : false
  );

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BeneficiaryFamilyMemberValidationSchema),
  });

  const getHelperText = (prop) => {
    if (errors[prop]) {
      return errors[prop].message;
    }
    return "";
  };

  useEffect(() => {
    var values = {
      dateOfBirth: dateOfBirth,
      gender: gender,
      hasDisability: hasDisability,
    };

    saveNewMember(index, values);
  }, [dateOfBirth, gender, hasDisability]);

  return (
    <Box>
      <Box pb={1}>
        <Grid container sx={{ width: "100%" }}>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Fecha de Nacimiento"}
                name={"dateOfBirth"}
                type="date"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                error={!!errors["dateOfBirth"]}
                helperText={getHelperText("dateOfBirth")}
                inputProps={register("dateOfBirth")}
                max={getActualDate()}
              />
            </Grid>

            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Género"}
                name={"gender"}
                select={true}
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                inputProps={register("gender")}
              >
                <MenuItem key={"female"} value={"F"}>
                  {"Femenino"}
                </MenuItem>
                <MenuItem key={"male"} value={"M"}>
                  {"Masculino"}
                </MenuItem>
              </FormField>
            </Grid>
          </Grid>
          <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ px: 1 }}>
            <FormControl label="">
              <Typography mb={{ xxs: 1, xs: 1, sm: 1 }} sx={{ mt: 1, px: 1 }}>
                {"¿Tiene alguna discapacidad y/o necesidad especial?"}
              </Typography>
              <RadioGroup
                controlid="selectedHasDisability"
                row
                xxs={12}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{ justifyContent: "flex-start", px: 1 }}
                onChange={(event) => setHasDisability(event.target.value)}
                value={hasDisability}
              >
                <FormControlLabel
                  name="hasDisabilityController"
                  control={
                    <Radio value={true} {...register("hasDisability")} />
                  }
                  label={"Si"}
                />
                <FormControlLabel
                  name="hasDisabilityController"
                  control={
                    <Radio value={false} {...register("hasDisability")} />
                  }
                  label={"No"}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isLastStep={isLastStep}
        isRemovable={isRemovable}
        showErrorAlert={showErrorAlert}
        handleShowErrorAlert={handleShowErrorAlert}
        showCreatedAlert={showCreatedAlert}
        handleShowCreatedAlert={handleShowCreatedAlert}
        showUpdatedAlert={showUpdatedAlert}
        handleShowUpdatedAlert={handleShowUpdatedAlert}
        onClickonCancelClick={onCancelClick}
        onClickSubmit={onSubmitFunction}
        onUpdateClickSubmit={onUpdateClickSubmit}
      />
    </Box>
  );
};

BeneficiaryFamilyMemberForm.propTypes = {
  index: PropTypes.number,
  isLastStep: PropTypes.any,
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isRemovable: PropTypes.bool,
  existingMember: PropTypes.object,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  handleShowErrorAlert: PropTypes.func,
  handleShowCreatedAlert: PropTypes.func,
  handleShowUpdatedAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSubmitFunction: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
  saveNewMember: PropTypes.func,
};

BeneficiaryFamilyMemberForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  isRemovable: false,
  showAlert: false,
  existingMember: null,
};

export default BeneficiaryFamilyMemberForm;
