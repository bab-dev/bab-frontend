import React from "react";
import { Grid, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";

const FormField = ({
  disabled = false,
  required = false,
  select,
  label,
  placeholder,
  name,
  defaultValue,
  value,
  type,
  multiline,
  error,
  helperText,
  inputProps,
  endLabel,
  action,
  children,
  onFocus,
  onBlur,
  onChange,
}) => {
  return (
    <Grid container my={{ xxs: 1, xs: 1, sm: 1, md: 2, lg: 2 }}>
      <Grid item xxs={12} xs={12}>
        <TextField
          disabled={disabled}
          required={required}
          select={select}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          fullWidth
          id={name}
          autoComplete={name}
          defaultValue={defaultValue}
          value={value}
          variant="outlined"
          type={type}
          className="form-control"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          inputProps={inputProps}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{endLabel}</InputAdornment>
            ),
          }}
          error={error}
          helperText={helperText}
          {...action}
        >
          {children}
        </TextField>
      </Grid>
    </Grid>
  );
};

FormField.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  select: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.any,
  helperText: PropTypes.any,
  inputProps: PropTypes.any,
  action: PropTypes.any,
  children: PropTypes.any,
  onFocus: PropTypes.any,
  onBlur: PropTypes.any,
  onChange: PropTypes.any,
};

export default FormField;
