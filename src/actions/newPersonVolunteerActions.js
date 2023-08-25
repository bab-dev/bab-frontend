import {
  ADD_PERSON,
  ADD_VOLUNTEER,
  ADD_VOLUNTEER_AVAILABILITY,
  ADD_EMERGENCY_CONTACT,
  DELETE_DATA,
} from "../actionTypes/actionTypes";

const addPerson = (person) => {
  return {
    type: ADD_PERSON,
    payload: {
      person: person,
    },
  };
};

const addVolunteer = (volunteer) => {
  return {
    type: ADD_VOLUNTEER,
    payload: {
      volunteer: volunteer,
    },
  };
};

const addVolunteerAvailability = (volunteerAvailability) => {
  return {
    type: ADD_VOLUNTEER_AVAILABILITY,
    payload: {
      volunteerAvailability: volunteerAvailability,
    },
  };
};

const addEmergencyContact = (emergencyContact) => {
  return {
    type: ADD_EMERGENCY_CONTACT,
    payload: {
      emergencyContact: emergencyContact,
    },
  };
};

const deleteNewPersonVolunteerData = () => {
  return {
    type: DELETE_DATA,
    payload: {},
  };
};

export {
  addPerson,
  addVolunteer,
  addVolunteerAvailability,
  addEmergencyContact,
  deleteNewPersonVolunteerData,
};
