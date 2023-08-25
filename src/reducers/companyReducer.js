import { SET_COMPANIES } from "../actionTypes/actionTypes";

const initialState = {
  companies: [],
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies,
      };

    default:
      return state;
  }
};
export default companyReducer;
