import {
  ADD_PERSON,
  ADD_VOLUNTEER,
  ADD_VOLUNTEER_AVAILABILITY,
  ADD_EMERGENCY_CONTACT,
  DELETE_DATA,
} from "../actionTypes/actionTypes";

const initialState = {
  person: {},
  volunteer: {},
  volunteerAvailability: {},
  emergencyContact: {},
};

const newPersonVolunteerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return {
        ...state,
        person: action.payload.person,
      };

    case ADD_VOLUNTEER:
      return {
        ...state,
        volunteer: action.payload.volunteer,
      };

    case ADD_VOLUNTEER_AVAILABILITY:
      return {
        ...state,
        volunteerAvailability: action.payload.volunteerAvailability,
      };

    case ADD_EMERGENCY_CONTACT:
      return {
        ...state,
        emergencyContact: action.payload.emergencyContact,
      };

    case DELETE_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export default newPersonVolunteerReducer;
