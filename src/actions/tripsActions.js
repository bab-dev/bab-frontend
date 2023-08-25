import { SET_TRIPS } from "../actionTypes/actionTypes";

const setTrips = (trips) => {
  return {
    type: SET_TRIPS,
    payload: {
      trips: trips,
    },
  };
};

export { setTrips };
