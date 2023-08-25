import { SET_VOLUNTEERS } from "../actionTypes/actionTypes";

const setVolunteers = (volunteers) => {
  return {
    type: SET_VOLUNTEERS,
    payload: {
      volunteers: volunteers,
    },
  };
};

export { setVolunteers };
