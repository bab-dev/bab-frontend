import {
  ADD_BENEFICIARY_PERSON,
  ADD_BENEFICIARY_FAMILY,
  ADD_BENEFICIARY_FAMILY_MEMBER,
  UPDATE_BENEFICIARY_FAMILY_MEMBER,
  DELETE_BENEFICIARY_FAMILY_MEMBER,
  DELETE_DATA,
} from "../actionTypes/actionTypes";

import { parseDate } from "helpers/dateHelper";

const addBeneficiaryPerson = (person) => {
  const parsedDateOfBirth = parseDate(person.dateOfBirth);
  return {
    type: ADD_BENEFICIARY_PERSON,
    payload: {
      person: {
        ...person,
        dateOfBirth: parsedDateOfBirth,
      },
    },
  };
};

const addBeneficiaryFamily = (beneficiaryFamily) => {
  const parsedRegistrationDate = parseDate(beneficiaryFamily.registrationDate);
  return {
    type: ADD_BENEFICIARY_FAMILY,
    payload: {
      beneficiaryFamily: {
        ...beneficiaryFamily,
        registrationDate: parsedRegistrationDate,
      },
    },
  };
};

const addBeneficiaryFamilyMember = (member) => {
  const parsedDateOfBirth = parseDate(member.dateOfBirth);
  return {
    type: ADD_BENEFICIARY_FAMILY_MEMBER,
    payload: {
      member: {
        ...member,
        dateOfBirth: parsedDateOfBirth,
      },
    },
  };
};

const updateBeneficiaryFamilyMember = (idMember, values) => {
  const parsedDateOfBirth = parseDate(values.dateOfBirth);
  return {
    type: UPDATE_BENEFICIARY_FAMILY_MEMBER,
    payload: {
      idMember: idMember,
      values: {
        ...values,
        dateOfBirth: parsedDateOfBirth,
      },
    },
  };
};

const deleteBeneficiaryFamilyMember = (idMember) => {
  return {
    type: DELETE_BENEFICIARY_FAMILY_MEMBER,
    payload: {
      idMember: idMember,
    },
  };
};

const deleteNewPersonBeneficiaryData = () => {
  return {
    type: DELETE_DATA,
    payload: {},
  };
};

export {
  addBeneficiaryPerson,
  addBeneficiaryFamily,
  addBeneficiaryFamilyMember,
  updateBeneficiaryFamilyMember,
  deleteBeneficiaryFamilyMember,
  deleteNewPersonBeneficiaryData,
};
