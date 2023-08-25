import { SET_TRIPS } from "../actionTypes/actionTypes";

const initialState = {
  trips: [],
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIPS:
      return {
        ...state,
        trips: action.payload.trips,
      };

    default:
      return state;
  }
};
export default tripReducer;
