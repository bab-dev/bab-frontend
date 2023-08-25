import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import PersonForm from "./PersonForm";
import VolunteerForm from "./VolunteerForm";
import VolunteerAvailabilityForm from "./VolunteerAvailabilityForm";
import EmergencyContactForm from "./EmergencyContactForm";

import {
  addPerson,
  addVolunteer,
  addVolunteerAvailability,
  addEmergencyContact,
  deleteNewPersonVolunteerData,
} from "actions/newPersonVolunteerActions";

import {
  setSelectedEmergencyContact,
  setSelectedPerson,
  setSelectedVolunteer,
  setSelectedVolunteerAvailability,
} from "actions/selectedPersonVolunteerActions";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "../../variables.js";
import { parseDate } from "helpers/dateHelper";

import StepperComponent from "components/Stepper";

const steps = [
  "Datos Personales",
  "Información Adicional",
  "Disponibilidad",
  "Contacto de Emergencia",
];

const PersonVolunteerForm = ({
  isCreate,
  isUpdate,
  isSignUp,
  existingPersonVolunteer,
  setOpen,
  showErrorAlert,
  setShowErrorAlert,
  showCreatedAlert,
  setShowCreatedAlert,
  showUpdatedAlert,
  setShowUpdatedAlert,
  getVolunteers,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [activeStep, setActiveStep] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const createPersonVolunteer = async (data) => {
    try {
      await axiosPrivate
        .post(
          variables.PERSON_VOLUNTEER_URL,
          JSON.stringify({
            Person: data.person,
            Volunteer: data.volunteer,
            VolunteerAvailability: data.volunteerAvailability,
            EmergencyContact: data.emergencyContact,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getVolunteers();
          dispatch(deleteNewPersonVolunteerData());
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

  const updatePersonVolunteer = async (data) => {
    try {
      await axiosPrivate
        .put(
          `${variables.PERSON_VOLUNTEER_URL}/${existingPersonVolunteer.selectedPerson.Id}`,
          JSON.stringify({
            Person: data.person,
            Volunteer: data.volunteer,
            VolunteerAvailability: data.volunteerAvailability,
            EmergencyContact: data.emergencyContact,
          })
        )
        .then((response) => {
          setShowUpdatedAlert(true);
          getVolunteers();
          dispatch(setSelectedPerson(response.data.Person));
          dispatch(setSelectedVolunteer(response.data.Volunteer));
          dispatch(
            setSelectedVolunteerAvailability(
              response.data.VolunteerAvailability
            )
          );
          dispatch(setSelectedEmergencyContact(response.data.EmergencyContact));
          dispatch(deleteNewPersonVolunteerData());
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

  const handleNext = (values) => {
    switch (activeStep) {
      case 0:
        values.dateOfBirth = parseDate(values.dateOfBirth);
        dispatch(addPerson(values));
        break;
      case 1:
        if (isCreate) {
          dispatch(addVolunteer(values));
        }
        if (isUpdate) {
          dispatch(
            addVolunteer({
              IDPerson: existingPersonVolunteer.selectedVolunteer.IDPerson,
              ...values,
            })
          );
        }
        break;
      case 2:
        if (isCreate) {
          dispatch(addVolunteerAvailability(values));
        }
        if (isUpdate) {
          dispatch(
            addVolunteerAvailability({
              IDVolunteer:
                existingPersonVolunteer.selectedVolunteerAvailability
                  .IDVolunteer,
              ...values,
            })
          );
        }
        break;
      default:
        break;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    if (activeStep == 0) {
      setOpen(false);
    }
  };

  const handleFormSubmit = async (values) => {
    dispatch(addEmergencyContact(values)); //Store data from last form in REDUX

    //Post obj to API retrieving all new object's data from REDUX state
    await createPersonVolunteer({
      ...state.newPersonVolunteer,
      ...{ emergencyContact: values },
    });
  };

  const handleUpdateFormSubmit = async (values) => {
    dispatch(
      addEmergencyContact({
        IDVolunteer:
          existingPersonVolunteer.selectedEmergencyContact.IDVolunteer,
        ...values,
      })
    );
    await updatePersonVolunteer({
      ...state.newPersonVolunteer,
      ...{
        emergencyContact: {
          IDVolunteer:
            existingPersonVolunteer.selectedEmergencyContact.IDVolunteer,
          ...values,
        },
      },
    });
  };

  const closeDialogs = () => {
    setShowErrorAlert(false);
    setShowCreatedAlert(false);
    setShowUpdatedAlert(false);
    setOpen(false);
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonForm
            isCreate={isCreate}
            isUpdate={isUpdate}
            isSignUp={isSignUp}
            existingPerson={
              existingPersonVolunteer
                ? existingPersonVolunteer.selectedPerson
                : null
            }
            onCancelClick={handleBack}
            onSubmitFunction={handleNext}
            onUpdateClickSubmit={handleNext}
          />
        );

      case 1:
        return (
          <VolunteerForm
            isCreate={isCreate}
            isUpdate={isUpdate}
            existingVolunteer={
              existingPersonVolunteer
                ? existingPersonVolunteer.selectedVolunteer
                : null
            }
            onCancelClick={handleBack}
            onSubmitFunction={handleNext}
            onUpdateClickSubmit={handleNext}
          />
        );
      case 2:
        return (
          <VolunteerAvailabilityForm
            isCreate={isCreate}
            isUpdate={isUpdate}
            existingVolunteerAvailability={
              existingPersonVolunteer
                ? existingPersonVolunteer.selectedVolunteerAvailability
                : null
            }
            onCancelClick={handleBack}
            onSubmitFunction={handleNext}
            onUpdateClickSubmit={handleNext}
          />
        );
      case 3:
        return (
          <EmergencyContactForm
            isCreate={isCreate}
            isUpdate={isUpdate}
            existingEmergencyContact={
              existingPersonVolunteer
                ? existingPersonVolunteer.selectedEmergencyContact
                : null
            }
            isLastStep={activeStep >= steps.length - 1}
            showErrorAlert={showErrorAlert}
            handleShowErrorAlert={() => setShowErrorAlert(false)}
            showCreatedAlert={showCreatedAlert}
            handleShowCreatedAlert={closeDialogs}
            showUpdatedAlert={showUpdatedAlert}
            handleShowUpdatedAlert={closeDialogs}
            onCancelClick={handleBack}
            onSubmitFunction={handleFormSubmit}
            onUpdateClickSubmit={handleUpdateFormSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StepperComponent
      activeStep={activeStep}
      steps={steps}
      content={renderContent()}
    />
  );
};

PersonVolunteerForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isSignUp: PropTypes.bool,
  existingPersonVolunteer: PropTypes.object,
  setOpen: PropTypes.func,
  showErrorAlert: PropTypes.bool,
  setShowErrorAlert: PropTypes.func,
  showCreatedAlert: PropTypes.bool,
  setShowCreatedAlert: PropTypes.func,
  showUpdatedAlert: PropTypes.bool,
  setShowUpdatedAlert: PropTypes.func,
  getVolunteers: PropTypes.func,
};

PersonVolunteerForm.defaultProps = {
  isSignUp: false,
  isCreate: false,
  isUpdate: false,
};

export default PersonVolunteerForm;
