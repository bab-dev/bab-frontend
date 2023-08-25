import { variables } from "variables";

import { useDispatch } from "react-redux";
import { setTokens } from "actions/tokenActions";
import { axiosPrivate } from "api/axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async (values) => {
    try {
      console.log("Calling refresh function");
      const response = await axiosPrivate.post(variables.REFRESH_TOKEN_URL, {
        accessToken: values.accessToken,
        refreshToken: values.refreshToken,
      });

      const newTokens = {
        newAccessToken: response.data.newAccessToken,
        newRefreshToken: response.data.newRefreshToken,
      };

      dispatch(
        setTokens(response.data.newAccessToken, response.data.newRefreshToken)
      );
      console.log("Refresh function called successfully");
      return newTokens;
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        throw new Error(`HTTP error: ${status}`);
      } else {
        throw new Error(`Error: ${err.message}`);
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
