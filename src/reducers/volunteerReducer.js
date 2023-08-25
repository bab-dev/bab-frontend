import { SET_VOLUNTEERS } from "../actionTypes/actionTypes";

const initialState = {
  volunteers: [],
};

const volunteerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VOLUNTEERS:
      return {
        ...state,
        volunteers: action.payload.volunteers,
      };
    default:
      return state;
  }
};
export default volunteerReducer;
