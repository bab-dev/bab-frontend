import { SET_COMPANIES } from "../actionTypes/actionTypes";

const setCompanies = (companies) => {
  return {
    type: SET_COMPANIES,
    payload: {
      companies: companies,
    },
  };
};

export { setCompanies };
