import {
  ADD_BENEFICIARY_PERSON,
  ADD_BENEFICIARY_FAMILY,
  ADD_BENEFICIARY_FAMILY_MEMBER,
  UPDATE_BENEFICIARY_FAMILY_MEMBER,
  DELETE_BENEFICIARY_FAMILY_MEMBER,
  DELETE_DATA,
} from "../actionTypes/actionTypes";

const initialState = {
  person: {},
  beneficiaryFamily: {},
  members: [],
};

const newPersonBeneficiaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BENEFICIARY_PERSON:
      return {
        ...state,
        person: action.payload.person,
      };

    case ADD_BENEFICIARY_FAMILY:
      return {
        ...state,
        beneficiaryFamily: action.payload.beneficiaryFamily,
      };
    case ADD_BENEFICIARY_FAMILY_MEMBER:
      return {
        ...state,
        members: [...state.members, action.payload.member], //Add the member to the array
      };

    case UPDATE_BENEFICIARY_FAMILY_MEMBER:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member.Id == action.payload.idMember) {
            return {
              ...action.payload.values,
            };
          }
          return member;
        }),
      };

    case DELETE_BENEFICIARY_FAMILY_MEMBER:
      return {
        ...state,
        members: state.members.filter(
          (member) => member.Id !== action.payload.idMember
        ),
      };
    case DELETE_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export default newPersonBeneficiaryReducer;
