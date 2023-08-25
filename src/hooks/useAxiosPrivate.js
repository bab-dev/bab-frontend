import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { setTokens } from "actions/tokenActions";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = state.token.accessToken;
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      async (response) => response,
      async (error) => {
        console.log("Response interceptor called");
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest._retry) {
          error.config._retry = true;
          prevRequest.sent = true;

          var prevTokens = {
            accessToken: state.token.accessToken,
            refreshToken: state.token.refreshToken,
          };

          try {
            const newAccessTokens = await refresh(prevTokens);
            console.log("Status:", newAccessTokens.status);
            if (newAccessTokens.status == 200) {
              dispatch(
                setTokens(
                  newAccessTokens.data.newAccessToken,
                  newAccessTokens.data.newRefreshToken
                )
              );
              axiosPrivate.defaults.headers.Authorization = `Bearer ${newAccessTokens.data.newAccessToken}`;
              console.log("Response interceptor completed");
              return axiosPrivate(prevRequest);
            }
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [axiosPrivate, refresh, state.token.accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
