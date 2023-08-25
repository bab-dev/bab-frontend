import React, { useState } from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import theme from "../../theme.js";
import ConfirmDialog from "components/dialogs/ConfirmDialog.jsx";
import CompanyDialog from "components/dialogs/CompanyDialog.jsx";
import ModifyMenu from "components/menus/ModifyMenu.jsx";
import DefaultFallBackImage from "img/default-fallback-image.png";

import { variables } from "variables.js";

const StyledUserCard = styled(Card)(() => ({
  borderRadius: 15,
  height: "100%",
  margin: 0,
  position: "relative",
  transition: "transform 0.15s ease-in-out",
  boxShadow: `0 3px 8px 0 ${theme.palette.common.black}`,
  "&:hover": { boxShadow: `0 2px 16px 2px ${theme.palette.common.black}` },
}));

const CompanyCard = ({ company, getAllCompanies, deleteCompany }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenCompanyDialog(false);
    setOpenConfirmDialog(false);
    setOpenMenu(false);
  };

  return (
    <StyledUserCard
      variant="outlined"
      sx={{
        maxWidth: "288px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <ModifyMenu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        anchorEl={anchorEl}
        onUpdateClick={() => setOpenCompanyDialog(true)}
        onDeleteClick={() => setOpenConfirmDialog(true)}
      />
      <CompanyDialog
        isUpdate
        open={openCompanyDialog}
        setOpen={setOpenCompanyDialog}
        existingCompany={company}
        onClose={handleClose}
        getAllCompanies={getAllCompanies}
      />
      <ConfirmDialog
        title="Eliminar Empresa"
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        onConfirm={deleteCompany}
        successMessage={"Se ha eliminado correctamente!"}
        onClose={handleClose}
      >
        ¿Está seguro de que quiere eliminar a esta empresa?
      </ConfirmDialog>
      <CardMedia
        component="img"
        sx={{
          maxWidth: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: "white",
          mx: "auto",
          display: "flex",
          alignItems: "center",
        }}
        image={company.ImageURL != "" ? company.ImageURL : DefaultFallBackImage}
        alt="Company image"
        onError={(e) =>
          (e.currentTarget.src = variables.DEFAULT_FALLBACK_IMAGE_URL)
        }
      />
      <CardContent p={theme.spacing(2)} pt={theme.spacing(0)}>
        <Grid container display={"flex"} direction={"column"}>
          <Grid item>
            <Typography
              color="textSecondary"
              variant="h6"
              align="center"
              fontWeight={"bold"}
              m={theme.spacing(0.5, 0, 1)}
            >
              {company.CompanyComercialName}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          px={{ xxs: 1, xs: 2, sm: 2, md: 2, lg: 3 }}
          display={"flex"}
          direction={"column"}
        >
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              width="100%"
              display={"flex"}
              m={theme.spacing(0, 0, 0.5)}
              sx={{
                overflow: "hidden",
              }}
            >
              <BadgeIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {company.BusinessName}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              noWrap={true}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              m={theme.spacing(0, 0, 0.5)}
            >
              <LocationOnIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {company.Address}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              m={theme.spacing(0, 0, 0.5)}
            >
              <PersonIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {company.Representative}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              m={theme.spacing(0, 0, 0.5)}
            >
              <PhoneIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {company.PhoneNumber}
            </Typography>
          </Grid>
          <Grid item display={"flex"} width={"100%"}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              align="left"
              noWrap={true}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              m={theme.spacing(0, 0, 0.5)}
            >
              <EmailIcon
                fontSize="small"
                style={{
                  verticalAlign: "middle",
                  marginRight: theme.spacing(1),
                }}
              />
              {company.Email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </StyledUserCard>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.any,
  deleteCompany: PropTypes.func,
  getAllCompanies: PropTypes.func,
};

export default CompanyCard;
