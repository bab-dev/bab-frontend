import { SET_MARKETS } from "../actionTypes/actionTypes";

const initialState = {
  markets: [],
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKETS:
      return {
        ...state,
        markets: action.payload.markets,
      };

    default:
      return state;
  }
};
export default marketReducer;
