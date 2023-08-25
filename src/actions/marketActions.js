import { SET_MARKETS } from "../actionTypes/actionTypes";

const setMarkets = (markets) => {
  return {
    type: SET_MARKETS,
    payload: {
      markets: markets,
    },
  };
};

export { setMarkets };
