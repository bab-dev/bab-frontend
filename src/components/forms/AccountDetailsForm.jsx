import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Checkbox,
  Grid,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FormField from "components/FormField";

import { parseDate } from "helpers/dateHelper.js";
import { variables } from "variables";

const AccountDetailsForm = () => {
  const state = useSelector((state) => state);
  //PERSON
  var selectedPerson = state.selectedPersonVolunteer.selectedPerson;
  var firstName = selectedPerson ? selectedPerson.FirstName : "";
  var middleName = selectedPerson ? selectedPerson.MiddleName : "";
  var firstSurname = selectedPerson ? selectedPerson.FirstSurname : "";
  var secondSurname = selectedPerson ? selectedPerson.SecondSurname : "";
  var dateOfBirth = selectedPerson ? parseDate(selectedPerson.DateOfBirth) : "";
  var email = selectedPerson ? selectedPerson.Email : "";
  var occupation = selectedPerson ? selectedPerson.Occupation : "";
  var ci = selectedPerson ? selectedPerson.CI : "";
  var address = selectedPerson ? selectedPerson.Address : "";
  var city = selectedPerson ? selectedPerson.City : "";
  var phoneNumber = selectedPerson ? selectedPerson.PhoneNumber : "";

  //VOLUNTEER
  var selectedVolunteer = state.selectedPersonVolunteer.selectedVolunteer;
  var idDepartment = selectedVolunteer ? selectedVolunteer.IDDepartment : "";
  var role = selectedVolunteer ? selectedVolunteer.RoleName : "";
  var category = selectedVolunteer ? selectedVolunteer.CategoryName : "";
  var group = selectedVolunteer ? selectedVolunteer.Group : "";
  var selectedIsVaccinated = selectedVolunteer
    ? selectedVolunteer.IsVaccinated
    : false;

  //VOLUNTEER AVAILABILITY
  const [formState, setFormState] = useState({});

  useEffect(() => {
    // Function to update the form values when existing data is provided
    const updateFormValues = (data) => {
      setFormState((prevState) => ({ ...prevState, ...data }));
    };

    // If existing data is provided, update the form values
    if (state.selectedPersonVolunteer.selectedVolunteerAvailability) {
      updateFormValues(
        state.selectedPersonVolunteer.selectedVolunteerAvailability
      );
    }
  }, [state.selectedPersonVolunteer.selectedVolunteerAvailability]);

  //EMERGENCY CONTACT
  var selectedEmergencyContact =
    state.selectedPersonVolunteer.selectedEmergencyContact;
  var emergencyContactName = selectedEmergencyContact
    ? selectedEmergencyContact.Name
    : "";

  var emergencyContactLastName = selectedEmergencyContact
    ? selectedEmergencyContact.LastName
    : "";

  var emergencyContactPhoneNumber = selectedEmergencyContact
    ? selectedEmergencyContact.PhoneNumber
    : "";

  var emergencyContactRelationship = selectedEmergencyContact
    ? selectedEmergencyContact.Relationship
    : 0;

  return (
    <Box sx={{ p: { xxs: 0, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 } }}>
      <Box py={2}>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Datos Personales
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Primer Nombre"}
                name={"firstName"}
                type={"text"}
                value={firstName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Segundo Nombre"}
                name={"middleName"}
                type={"text"}
                value={middleName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Apellido Paterno"}
                name={"firstSurname"}
                type={"text"}
                value={firstSurname}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Apellido Materno"}
                name={"secondSurname"}
                type={"text"}
                value={secondSurname}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Fecha de Nacimiento"}
                name={"dateOfBirth"}
                type="date"
                value={dateOfBirth}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Correo Electrónico"}
                name={"email"}
                type={"text"}
                value={email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Ocupación"}
                name={"occupation"}
                type={"text"}
                value={occupation}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Cédula de Identidad"}
                name={"ci"}
                type={"number"}
                value={ci}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} width={"100%"}>
        <Typography variant="h5" sx={{ py: 2, px: 1 }}>
          Información de Contacto
        </Typography>
        <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ px: 1 }}>
          <FormField
            label={"Dirección"}
            name={"address"}
            type={"text"}
            value={address}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
            <FormField label={"Ciudad"} name={"city"} value={city} />
          </Grid>
          <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
            <FormField
              label={"Celular"}
              name={"phoneNumber"}
              type={"number"}
              value={phoneNumber}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box py={2}>
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
                InputProps={{
                  readOnly: true,
                }}
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
                label={"Rol"}
                name={"volunteerRole"}
                type="text"
                value={role}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Categoría"}
                name={"volunteerCategory"}
                type="text"
                value={category}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Grupo"}
                name={"group"}
                type={"text"}
                value={group}
                InputProps={{
                  readOnly: true,
                }}
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
                value={selectedIsVaccinated}
              >
                <FormControlLabel
                  name="isVaccinatedController"
                  control={<Radio value={true} />}
                  label={"Si"}
                />
                <FormControlLabel
                  name="isVaccinatedController"
                  control={<Radio value={false} />}
                  label={"No"}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={1}>
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
                        control={<Checkbox checked={isChecked || false} />}
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
      <Box py={2}>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Contacto de Emergencia
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Nombre"}
                name={"name"}
                type={"text"}
                value={emergencyContactName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Apellido"}
                name={"lastName"}
                type={"text"}
                value={emergencyContactLastName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Celular"}
                name={"phoneNumber"}
                type={"number"}
                value={emergencyContactPhoneNumber}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                select={true}
                label={"Relación"}
                name={"relationship"}
                value={emergencyContactRelationship}
                InputProps={{
                  readOnly: true,
                }}
              >
                {variables.EMERGENCY_CONTACT_RELATIONSHIPS.map((contact) => (
                  <MenuItem key={contact.name} value={contact.value}>
                    {contact.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountDetailsForm;
