import { SIGN_IN, SIGN_OUT, SET_USER_DATA } from "../actionTypes/actionTypes";

const initialState = {
  isLogged: false,
  email: "",
  idUser: null,
  idPerson: "",
  userRole: "",
  userData: {},
  roles: [],
  permissions: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isLogged: true,
        email: action.payload.email,
        idUser: action.payload.idUser,
        idPerson: action.payload.idPerson,
        userRole: action.payload.userRole,
        roles: action.payload.roles,
        permissions: action.payload.permissions,
      };

    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload.userData,
      };

    case SIGN_OUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
export default userReducer;
