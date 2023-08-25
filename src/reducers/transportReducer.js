import { SET_SELECTED_TRANSPORT_REQUEST } from "../actionTypes/actionTypes";

const initialState = {
  request: {},
};

const transportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TRANSPORT_REQUEST:
      return {
        ...state,
        request: action.payload.request,
      };
    default:
      return state;
  }
};
export default transportReducer;
