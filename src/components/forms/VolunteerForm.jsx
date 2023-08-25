import {
  Box,
  Grid,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  Typography,
} from "@mui/material";

import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";
import volunteerValidationSchema from "validationSchemas/volunteerValidationSchema.js";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import { volunteerVariables } from "variables/volunteerVariables.js";

const VolunteerForm = ({
  isCreate,
  isUpdate,
  existingVolunteer,
  showAlert,
  handleHideAlert,
  onCancelClick,
  onSubmitFunction,
  onUpdateClickSubmit,
}) => {
  const state = useSelector((state) => state);

  const [idDepartment, setIdDepartment] = useState(
    existingVolunteer ? existingVolunteer.IDDepartment : ""
  );
  const [role, setRole] = useState(
    existingVolunteer ? parseInt(existingVolunteer.Role) : 3
  );
  const [category, setCategory] = useState(
    existingVolunteer ? parseInt(existingVolunteer.Category) : 0
  );
  const [group, setGroup] = useState(
    existingVolunteer ? existingVolunteer.Group : " "
  );
  const [selectedIsVaccinated, setSelectedIsVaccinated] = useState(
    existingVolunteer ? existingVolunteer.IsVaccinated : false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(volunteerValidationSchema),
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  return (
    <Box p={2} width={"100%"}>
      <Box>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Información Adicional
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                select={true}
                label={"Departamento BAB"}
                name={"idDepartment"}
                value={idDepartment}
                onChange={(event) => setIdDepartment(event.target.value)}
                error={!!errors["idDepartment"]}
                helperText={getHelperText("idDepartment")}
                inputProps={register("idDepartment")}
              >
                {state.department.departments.map((department) => (
                  <MenuItem
                    key={department.DepartmentName}
                    value={department.Id}
                  >
                    {department.DepartmentName}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                select={true}
                label={"Rol"}
                name={"role"}
                value={role}
                onChange={(event) => setRole(parseInt(event.target.value))}
                error={!!errors["role"]}
                helperText={getHelperText("role")}
                inputProps={register("role")}
              >
                {volunteerVariables.VOLUNTEER_ROLES.map((role) => (
                  <MenuItem key={role.name} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                select={true}
                label={"Categoría"}
                name={"category"}
                value={category}
                onChange={(event) => setCategory(parseInt(event.target.value))}
                error={!!errors["category"]}
                helperText={getHelperText("category")}
                inputProps={register("category")}
              >
                {volunteerVariables.VOLUNTEER_CATEGORIES.map((category) => (
                  <MenuItem key={category.categoryName} value={category.value}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Grupo"}
                name={"group"}
                type={"text"}
                value={group}
                onChange={(event) => setGroup(event.target.value)}
                error={!!errors["group"]}
                helperText={getHelperText("group")}
                inputProps={register("group")}
              />
            </Grid>
          </Grid>
          <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ pt: 1 }}>
            <FormControl label="">
              <Typography mb={{ xxs: 1, xs: 1, sm: 1 }} sx={{ mt: 1, px: 1 }}>
                {"Vacunado contra COVID-19"}
              </Typography>
              <RadioGroup
                controlid="selectedIsVaccinated"
                row
                xxs={12}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{ justifyContent: "space-between", px: 1 }}
                onChange={(event) =>
                  setSelectedIsVaccinated(event.target.value)
                }
                value={selectedIsVaccinated}
              >
                <FormControlLabel
                  name="isVaccinatedController"
                  control={<Radio value={true} {...register("isVaccinated")} />}
                  label={"Si"}
                ></FormControlLabel>
                <FormControlLabel
                  name="isVaccinatedController"
                  control={
                    <Radio value={false} {...register("isVaccinated")} />
                  }
                  label={"No"}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
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

VolunteerForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingVolunteer: PropTypes.object,
  showAlert: PropTypes.bool,
  handleHideAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSubmitFunction: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
};

VolunteerForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingVolunteer: null,
};

export default VolunteerForm;
