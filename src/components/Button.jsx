import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const MyButton = styled(Button)(({ theme, ...otherProps }) => ({
  backgroundColor: {
    contained: `${theme.palette.primary.main}`,
    outlined: `${theme.palette.common.main}`,
  }[otherProps.variant],
  border: {
    contained: "none",
    outlined: `0.063rem solid ${theme.palette.primary.main}`,
  }[otherProps.variant],
  fontSize: `${theme.typography.button}`,
  borderRadius: 50,
  display: "block",
  width: "100%",
  cursor: "pointer",
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(2),
  textAlign: "center",
  color: {
    contained: `${theme.palette.typography.main}`,
    outlined: `${theme.palette.primary.main}`,
  }[otherProps.variant],
}));

const StyledButton = ({ variant, children, className, onClick, disabled }) => {
  return (
    <MyButton
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MyButton>
  );
};

StyledButton.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default StyledButton;
