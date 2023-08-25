import {
  SET_SELECTED_PERSON,
  SET_SELECTED_VOLUNTEER,
  SET_SELECTED_VOLUNTEER_AVAILABILITY,
  SET_SELECTED_EMERGENCY_CONTACT,
} from "../actionTypes/actionTypes";

const initialState = {
  selectedPerson: null,
  selectedVolunteer: null,
  selectedVolunteerAvailability: null,
  selectedEmergencyContact: null,
};

const selectedPersonVolunteerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PERSON:
      return {
        ...state,
        selectedPerson: action.payload.selectedPerson,
      };
    case SET_SELECTED_VOLUNTEER:
      return {
        ...state,
        selectedVolunteer: action.payload.selectedVolunteer,
      };
    case SET_SELECTED_VOLUNTEER_AVAILABILITY:
      return {
        ...state,
        selectedVolunteerAvailability:
          action.payload.selectedVolunteerAvailability,
      };
    case SET_SELECTED_EMERGENCY_CONTACT:
      return {
        ...state,
        selectedEmergencyContact: action.payload.selectedEmergencyContact,
      };

    default:
      return state;
  }
};
export default selectedPersonVolunteerReducer;
