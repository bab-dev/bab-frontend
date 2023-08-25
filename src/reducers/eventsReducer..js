import {
  SET_ALL_EVENTS,
  SET_VOLUNTEER_EVENTS,
} from "../actionTypes/actionTypes";

const initialState = {
  allEvents: [],
  volunteerEvents: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload.allEvents,
      };

    case SET_VOLUNTEER_EVENTS:
      return {
        ...state,
        volunteerEvents: action.payload.volunteerEvents,
      };

    default:
      return state;
  }
};
export default eventsReducer;
