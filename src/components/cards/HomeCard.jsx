import React from "react";
import PropTypes from "prop-types";

// material-ui
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";

// project imports
import MainCard from "../cards/MainCard";
import theme from "theme";

const CardWrapper = styled(MainCard)(({ ...otherProps }) => ({
  overflow: "hidden",
  width: "100%",
  maxHeight: "272px",
  minHeight: "216px",
  height: "auto",
  position: "relative",
  backgroundImage: `url(${otherProps.imageurl})`,
  backgroundSize: "cover",
  cursor: "pointer",
  transition: "transform 0.15s ease-in-out",
  boxShadow: `0 3px 4px 0 ${theme.palette.common.black}`,
  "&:hover": { boxShadow: `0 2px 16px 6px ${theme.palette.common.black}` },
}));

const ImageBackdrop = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: "100%",
  backgroundColor: theme.palette.common.black,
  opacity: 0.3,
  transition: theme.transitions.create("opacity"),
  ":hover": {
    opacity: 0.1,
  },
}));

const TextBox = styled("span")(({ theme }) => ({
  position: "absolute",
  left: "25%",
  right: "25%",
  top: "50%",
  bottom: "auto",
  height: "auto",
  justifyContent: "center",
  justifySelf: "center",
  color: theme.palette.common.white,
  backgroundColor: "#00000066",
}));

const HomeCard = ({ title, imageURL, onClick }) => {
  return (
    <CardWrapper
      border={false}
      boxShadow={true}
      content={false}
      imageurl={imageURL}
      onClick={onClick}
    >
      <ImageBackdrop />
      <Box>
        <TextBox>
          <Grid
            container
            direction="column"
            display={"flex"}
            alignItems="center"
            justify="center"
            height={"100%"}
          >
            <Grid
              container
              item
              width={"100%"}
              display="flex"
              alignItems={"center"}
              alignContent="center"
              justifyContent="center"
              justifyItems={"center"}
            >
              <Typography
                variant="button"
                color="inherit"
                fontWeight={"bold"}
                width={"100%"}
                display="flex"
                justifySelf={"center"}
                justifyContent="center"
                justifyItems={"center"}
                boxShadow={2}
              >
                {title}
              </Typography>
            </Grid>
          </Grid>{" "}
        </TextBox>
      </Box>
    </CardWrapper>
  );
};

HomeCard.propTypes = {
  title: PropTypes.string,
  imageurl: PropTypes.string,
  onClick: PropTypes.any,
};

export default HomeCard;
