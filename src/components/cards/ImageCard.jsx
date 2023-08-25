import React from "react";
import PropTypes from "prop-types";

import { Card, CardActionArea, CardMedia } from "@mui/material";

const ImageCard = ({ imageURL }) => {
  return (
    <Card sx={{ maxWidth: 500, maxHeight: 500, height: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={imageURL}
          alt="Caserit@ del mes"
          sx={{
            objectFit: "fill",
          }}
        />
      </CardActionArea>
    </Card>
  );
};

ImageCard.propTypes = {
  imageURL: PropTypes.string,
};

export default ImageCard;
