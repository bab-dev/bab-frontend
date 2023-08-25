import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import { InputAdornment, IconButton, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  "&.Mui-focused": {
    //width: 320,
    boxShadow: 3,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchBar = ({ filter, onChange, placeholder }) => {
  return (
    <StyledSearch>
      <TextField
        id={"searchBar"}
        className="form-control"
        placeholder={placeholder}
        variant="outlined"
        type={"text"}
        value={filter}
        onChange={onChange}
        sx={{ width: "100%" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </StyledSearch>
  );
};

SearchBar.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
