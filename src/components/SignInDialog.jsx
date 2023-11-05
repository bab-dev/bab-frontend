import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import jwtDecode from "jwt-decode";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { variables } from "../variables.js";
import LogoBAB from "../img/logoBAB2.png";

import { signIn, setUserData } from "actions/userActions";
import { setTokens } from "actions/tokenActions.js";

import ClockingDialog from "./dialogs/ClockingDialog.jsx";
import SignInForm from "./forms/SignInForm.jsx";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

const SignInDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openClockingDialog, setOpenClockingDialog] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleHideAlert = () => {
    setShowAlert(!showAlert);
  };

  const getUserData = async (idPerson) => {
    try {
      const response = await axiosPrivate.get(
        `${variables.PERSON_VOLUNTEER_URL}/${idPerson}`
      );
      dispatch(setUserData(response.data));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        throw Error(`HTTP error: ${status}`);
      }
    }
  };

  const onSubmit = async (values) => {
    try {
      const response = await axiosPrivate
        .post(
          variables.LOGIN_URL,
          JSON.stringify({
            email: values.email,
            password: values.password,
          })
        )
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            if (status === 401) {
              throw Error("User must be authenticated to proceed.");
            } else if (status === 400 || status === 401) {
              setShowAlert(true);
            }
            throw Error(`HTTP error: ${status}`);
          }
        });

      dispatch(
        signIn(
          values.email,
          response.data.IDUser,
          response.data.IDPerson,
          response.data.UserRole,
          response.data.Roles,
          response.data.Permissions
        )
      );
      dispatch(
        setTokens(response.data.AccessToken, response.data.RefreshToken)
      );

      const decodedToken = jwtDecode(response.data.AccessToken);
      const expirationTime = new Date(decodedToken.exp * 1000);
      console.log(expirationTime.toString());

      await getUserData(response.data.IDPerson);
      navigate(`/${variables.HOME_URL}`);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <Box className="App">
      <Dialog open={true} fullWidth maxWidth="sm">
        <DialogTitle sx={{ mt: 2, pb: 0, px: { xxs: 0 } }}>
          <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xxs={6} xs={6} sm={6} md={6} lg={6} sx={{ m: 0, py: 2 }}>
              <img
                src={LogoBAB}
                className="App-logo"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="logo"
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ mb: 2, pt: 0, px: { xxs: 0, xs: 2 } }}>
          <SignInForm
            onSubmit={onSubmit}
            showAlert={showAlert}
            handleHideAlert={handleHideAlert}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            setOpenClockingDialog={setOpenClockingDialog}
          />
          <ClockingDialog
            open={openClockingDialog}
            setOpen={setOpenClockingDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SignInDialog;
