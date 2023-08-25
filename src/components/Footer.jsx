import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Grid, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import theme from "theme";
import { variables } from "variables";

import LogoBAB from "img/logoBAB2.png";
import IsotypeBAB from "../img/isotypeBAB.png";

const iconButtonStyle = {
  border: `0.063rem solid ${theme.palette.primary.main}`,
  borderRadius: "25%",
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(1),
  color: `${theme.palette.primary.main}`,
};

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <Box
        sx={{
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "auto",
          borderTop: 1,
          bgcolor: `${theme.palette.secondary.main}`,
          color: `${theme.palette.primary.main}`,
          borderColor: "black",
          display: {
            xxs: "none",
            xs: "inline-flex",
            sm: "inline-flex",
            md: "inline-flex",
            lg: "inline-flex",
          },
        }}
      >
        <Grid
          container
          flexWrap={"nowrap"}
          px={{ xxs: 1, xs: 2, sm: 4, md: 6, lg: 6 }}
          py={{ xxs: 1, xs: 1, sm: 1, md: 2, lg: 2 }}
        >
          <Grid
            container
            item
            display={"flex"}
            justifyContent={"flex-start"}
            width={"auto"}
          >
            <Grid
              item
              sx={{
                display: {
                  xxs: "none",
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                },
              }}
            >
              <img
                src={LogoBAB}
                style={{
                  maxWidth: "30%",
                  height: "auto",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
                alt="Logo Banco de Alimentos de Bolivia"
                onClick={() => navigate(`/${variables.HOME_URL}`)}
              />
            </Grid>
            <Grid
              container
              item
              flex-wrap="nowrap"
              sx={{
                display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
                width: "auto",
                flexGrow: 1,
              }}
            >
              <IconButton
                size="medium"
                style={{ pl: 0, pt: 0 }}
                onClick={() => navigate(`/${variables.HOME_URL}`)}
              >
                <Avatar
                  alt="Isotipo Banco de Alimentos de Bolivia"
                  sx={{ width: 32, height: 32 }}
                  src={IsotypeBAB}
                />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            display={"flex"}
            justifyContent={"flex-end"}
            flexWrap={"nowrap"}
            alignItems="center"
            width="100%"
            height="auto"
          >
            <Grid item m={2}>
              <IconButton
                style={iconButtonStyle}
                href={variables.WEBSITE_URL}
                sx={{
                  fontSize: {
                    xxs: "extra-small",
                    xs: "small",
                    sm: "medium",
                    md: "extra-large",
                    lg: "extra-large",
                  },
                }}
              >
                <LanguageIcon />
              </IconButton>
            </Grid>
            <Grid item m={2}>
              <IconButton
                style={iconButtonStyle}
                href={variables.FACEBOOK_URL}
                sx={{
                  fontSize: {
                    xxs: "extra-small",
                    xs: "small",
                    sm: "medium",
                    md: "extra-large",
                    lg: "extra-large",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
            </Grid>
            <Grid item m={2}>
              <IconButton
                style={iconButtonStyle}
                href={variables.WEBSITE_URL}
                sx={{
                  fontSize: {
                    xxs: "extra-small",
                    xs: "small",
                    sm: "medium",
                    md: "extra-large",
                    lg: "extra-large",
                  },
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Grid>
            <Grid item m={2}>
              <IconButton
                style={iconButtonStyle}
                href={variables.INSTAGRAM_URL}
                sx={{
                  fontSize: {
                    xxs: "extra-small",
                    xs: "small",
                    sm: "medium",
                    md: "extra-large",
                    lg: "extra-large",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
