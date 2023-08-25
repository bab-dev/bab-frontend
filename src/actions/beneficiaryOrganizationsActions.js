import { SET_BENEFICIARY_ORGANIZATIONS } from "../actionTypes/actionTypes";

const setBeneficiaryOrganizations = (organizations) => {
  return {
    type: SET_BENEFICIARY_ORGANIZATIONS,
    payload: {
      organizations: organizations,
    },
  };
};

export { setBeneficiaryOrganizations };
