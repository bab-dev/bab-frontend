import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import {
  Alert,
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import FormField from "../FormField.jsx";
import SignInValidationSchema from "validationSchemas/signInValidationSchema.js";
import StyledButton from "components/Button.jsx";

const SignInForm = ({
  onSubmit,
  showPassword,
  handleClickShowPassword,
  showAlert,
  handleHideAlert,
  setOpenClockingDialog,
}) => {
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInValidationSchema),
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  return (
    <Box sx={{ width: "100%", px: { xxs: 1, xs: 1, sm: 2, md: 4, lg: 4 } }}>
      <Grid container sx={{ width: "100%" }} direction={"column"}>
        <Grid
          item
          xxs={12}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{ px: 1, pt: 1, width: "100%" }}
        >
          <FormField
            required
            label={"Correo Electrónico"}
            name={"email"}
            type={"text"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!!errors["email"]}
            helperText={getHelperText("email")}
            inputProps={register("email")}
          />
        </Grid>
        <Grid
          item
          xxs={12}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{ px: 1, pt: 1 }}
        >
          <TextField
            required
            fullWidth
            variant="outlined"
            label="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors["password"]}
            helperText={errors["password"] ? errors["password"].message : ""}
            {...register("password")}
          />
        </Grid>
        <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} pt={4} px={1}>
          <StyledButton
            fullWidth
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            mb={{ xxs: 1, xs: 1, sm: 2 }}
            sx={{ mt: 2 }}
          >
            {"INICIAR SESIÓN"}
          </StyledButton>
          <Divider variant="middle" sx={{ mt: 2, mb: 2 }}>
            o
          </Divider>
          <StyledButton
            fullWidth
            variant="outlined"
            type="submit"
            onClick={() => setOpenClockingDialog(true)}
            mb={{ xxs: 1, xs: 1, sm: 2 }}
            sx={{ mt: 2 }}
          >
            {"Registar entrada/salida"}
          </StyledButton>
        </Grid>
        <Dialog open={showAlert} onClose={handleHideAlert}>
          <Alert severity="error">
            Correo electrónico o contraseña son incorrectos!
          </Alert>
        </Dialog>
      </Grid>
    </Box>
  );
};

SignInForm.propTypes = {
  showAlert: PropTypes.bool,
  handleHideAlert: PropTypes.func,
  showPassword: PropTypes.bool,
  handleClickShowPassword: PropTypes.func,
  onSubmit: PropTypes.func,
  setOpenClockingDialog: PropTypes.func,
};

SignInForm.defaultProps = {
  showAlert: false,
};

export default SignInForm;
