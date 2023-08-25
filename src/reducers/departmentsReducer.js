import { GET_DEPARTMENTS } from "../actionTypes/actionTypes";

const initialState = {
  departments: [],
};

const departmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload.departments,
      };

    default:
      return state;
  }
};
export default departmentsReducer;
