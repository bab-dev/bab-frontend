import {
  SET_SELECTED_PERSON,
  SET_SELECTED_VOLUNTEER,
  SET_SELECTED_VOLUNTEER_AVAILABILITY,
  SET_SELECTED_EMERGENCY_CONTACT,
  DELETE_DATA,
} from "../actionTypes/actionTypes";

const setSelectedPerson = (selectedPerson) => {
  return {
    type: SET_SELECTED_PERSON,
    payload: {
      selectedPerson: selectedPerson,
    },
  };
};

const setSelectedVolunteer = (selectedVolunteer) => {
  return {
    type: SET_SELECTED_VOLUNTEER,
    payload: {
      selectedVolunteer: selectedVolunteer,
    },
  };
};

const setSelectedVolunteerAvailability = (selectedVolunteerAvailability) => {
  return {
    type: SET_SELECTED_VOLUNTEER_AVAILABILITY,
    payload: {
      selectedVolunteerAvailability: selectedVolunteerAvailability,
    },
  };
};

const setSelectedEmergencyContact = (selectedEmergencyContact) => {
  return {
    type: SET_SELECTED_EMERGENCY_CONTACT,
    payload: {
      selectedEmergencyContact: selectedEmergencyContact,
    },
  };
};

const deleteSelectedPersonVolunteerData = () => {
  return {
    type: DELETE_DATA,
    payload: {},
  };
};
export {
  setSelectedPerson,
  setSelectedVolunteer,
  setSelectedVolunteerAvailability,
  setSelectedEmergencyContact,
  deleteSelectedPersonVolunteerData,
};
