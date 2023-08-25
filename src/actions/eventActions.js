import {
  SET_ALL_EVENTS,
  SET_VOLUNTEER_EVENTS,
} from "../actionTypes/actionTypes";

const setAllEvents = (allEvents) => {
  return {
    type: SET_ALL_EVENTS,
    payload: {
      allEvents: allEvents,
    },
  };
};

const setVolunteerAssignedEvents = (volunteerEvents) => {
  return {
    type: SET_VOLUNTEER_EVENTS,
    payload: {
      volunteerEvents: volunteerEvents,
    },
  };
};

export { setAllEvents, setVolunteerAssignedEvents };
