import { DESTROY_SESSION } from "../actionTypes/actionTypes";

const destroySession = () => {
  return {
    type: DESTROY_SESSION,
  };
};

export { destroySession };
