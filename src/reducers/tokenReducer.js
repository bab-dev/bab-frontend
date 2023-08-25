import { SET_TOKENS, SIGN_OUT } from "../actionTypes/actionTypes";

const initialState = {
  accessToken: "",
  refreshToken: "",
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    case SIGN_OUT:
      return {
        state: initialState,
      };

    default:
      return state;
  }
};
export default tokenReducer;
