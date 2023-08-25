import { SET_BENEFICIARY_ORGANIZATIONS } from "../actionTypes/actionTypes";

const initialState = {
  organizations: [],
};

const beneficiaryOrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BENEFICIARY_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload.organizations,
      };

    default:
      return state;
  }
};
export default beneficiaryOrganizationReducer;
