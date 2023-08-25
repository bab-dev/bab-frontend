import { SET_SELECTED_TRANSPORT_REQUEST } from "../actionTypes/actionTypes";

const setSelectedTransportRequest = (request) => {
  return {
    type: SET_SELECTED_TRANSPORT_REQUEST,
    payload: {
      request: request,
    },
  };
};

export { setSelectedTransportRequest };
