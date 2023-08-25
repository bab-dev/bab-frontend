import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

//Icons
import BusinessIcon from "@mui/icons-material/Business";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

import theme from "theme";

const CardWrapperClickable = styled(Card)(({ theme }) => ({
  overflow: "hidden",
  width: "100%",
  position: "relative",
  padding: theme.spacing(3),
  transition: "transform 0.15s ease-in-out",
  cursor: "pointer",
  boxShadow: `0 3px 8px 0 ${theme.palette.common.black}`,
  "&:hover": { boxShadow: `0 2px 16px 2px ${theme.palette.common.black}` },
}));

const CardWrapperNonClickable = styled(Card)(({ theme }) => ({
  overflow: "hidden",
  width: "100%",
  position: "relative",
  padding: theme.spacing(4),
  cursor: "default",
}));

const renderCardContent = ({
  title,
  subtitle,
  isIconCard,
  isCompanyCard,
  isMarketSellersCard,
  isFamilyCard,
}) => {
  return (
    <Grid
      container
      direction="column"
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      wrap="nowrap"
      height={"100%"}
      width={"100%"}
    >
      <CardMedia sx={{ pt: 2 }}>
        {!isIconCard && (
          <Typography
            variant="h3"
            color="inherit"
            fontWeight={"bold"}
            align="center"
          >
            {title}
          </Typography>
        )}
        {isIconCard && (
          <Typography
            variant="h3"
            color="inherit"
            fontWeight={"bold"}
            align="center"
            width={"100%"}
          >
            {isCompanyCard && (
              <BusinessIcon
                fontSize="large"
                style={{
                  width: "100%",
                }}
              />
            )}
            {isMarketSellersCard && (
              <StorefrontIcon
                fontSize="large"
                style={{
                  width: "100%",
                }}
              />
            )}
            {isFamilyCard && (
              <FamilyRestroomIcon
                fontSize="large"
                style={{
                  width: "100%",
                }}
              />
            )}
          </Typography>
        )}
      </CardMedia>
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" color="inherit" align="center">
          {subtitle}
        </Typography>
      </CardContent>
    </Grid>
  );
};
const DetailCard = ({
  isClickable,
  title,
  subtitle,
  isIconCard,
  isCompanyCard,
  isMarketSellersCard,
  isFamilyCard,
  onClick,
}) => {
  return (
    <Box width={"100%"} px={{ xxs: 3, xs: 4, sm: 0, md: 0, lg: 0, xl: 0 }}>
      {isClickable ? (
        <CardWrapperClickable
          sx={{
            width: "100%",
            maxHeight: "240px",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            p: 1,
            boxShadow: "0 2px 6px 0 #000000",
          }}
          elevation={6}
          onClick={onClick}
          style={{
            backgroundColor: isIconCard
              ? theme.palette.primary.main
              : theme.palette.common.white,
            color: isIconCard ? theme.palette.common.white : "inherit",
          }}
        >
          {renderCardContent({
            title,
            subtitle,
            isIconCard,
            isCompanyCard,
            isMarketSellersCard,
            isFamilyCard,
          })}
        </CardWrapperClickable>
      ) : (
        <CardWrapperNonClickable
          sx={{
            width: "100%",
            maxHeight: "288px",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            p: 1,
            boxShadow: "0 2px 6px 0 #000000",
          }}
          elevation={6}
          onClick={onClick}
          style={{
            backgroundColor: isIconCard
              ? theme.palette.primary.main
              : theme.palette.common.white,
            color: isIconCard ? theme.palette.common.white : "inherit",
          }}
        >
          {renderCardContent({
            title,
            subtitle,
            isIconCard,
            isCompanyCard,
            isMarketSellersCard,
            isFamilyCard,
          })}
        </CardWrapperNonClickable>
      )}
    </Box>
  );
};

DetailCard.propTypes = {
  isClickable: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isIconCard: PropTypes.bool,
  isCompanyCard: PropTypes.bool,
  isMarketSellersCard: PropTypes.bool,
  isFamilyCard: PropTypes.bool,
  onClick: PropTypes.any,
};

export default DetailCard;
