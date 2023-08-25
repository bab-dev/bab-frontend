import { SIGN_IN, SIGN_OUT, SET_USER_DATA } from "../actionTypes/actionTypes";

const signIn = (email, idUser, idPerson, userRole, roles, permissions) => {
  return {
    type: SIGN_IN,
    payload: {
      email: email,
      idUser: idUser,
      idPerson: idPerson,
      userRole: userRole,
      roles: roles,
      permissions: permissions,
    },
  };
};

const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: {
      userData: userData,
    },
  };
};

const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export { signIn, signOut, setUserData };
