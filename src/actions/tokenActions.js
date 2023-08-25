import { SET_TOKENS } from "../actionTypes/actionTypes";

const setTokens = (accessToken, refreshToken) => {
  return {
    type: SET_TOKENS,
    payload: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };
};

export { setTokens };
