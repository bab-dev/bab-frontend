import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

//import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

import FormActions from "components/FormActions";
import BeneficiaryFamilyMemberForm from "./BeneficiaryFamilyMemberForm.jsx";

import theme from "theme.js";

const BeneficiaryMembersForm = ({
  isLastStep,
  isCreate,
  isUpdate,
  existingBeneficiaryMembers,
  showErrorAlert,
  handleShowErrorAlert,
  showCreatedAlert,
  handleShowCreatedAlert,
  showUpdatedAlert,
  handleShowUpdatedAlert,
  onCancelClick,
  onSubmitFunction,
  onUpdateClickSubmit,
}) => {
  const [hasMembers, setHasMembers] = useState(
    existingBeneficiaryMembers.length > 0 ? true : false
  );
  const [members, setMembers] = useState(
    existingBeneficiaryMembers ? existingBeneficiaryMembers : []
  );

  const addMember = () => {
    setMembers((prevMembers) => [
      ...prevMembers,
      {
        Id: uuidv4(),
      },
    ]);
  };

  const saveNewMember = (index, values) => {
    let idMember = members[index].Id;

    const prevMembers = [...members];
    prevMembers[index] = values;
    prevMembers[index].Id = idMember;
    setMembers(prevMembers);
  };

  const removeMember = (id) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.Id != id)
    );
  };

  const renderMembersContent = () => {
    return (
      <Grid
        container
        item
        display={"flex"}
        direction={"column"}
        p={2}
        //mb={4}
        sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
      >
        {members.map((member, index) => (
          <Accordion
            key={member.Id}
            sx={{
              border: `0.8px solid ${theme.palette.primary.main}`,
              boxShadow: 3,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ px: 1 }}>
                {" "}
                Miembro {index + 1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <BeneficiaryFamilyMemberForm
                index={index}
                isRemovable
                memberNumber={index + 1}
                existingMember={member != null ? member : null}
                showErrorAlert={showErrorAlert}
                handleShowErrorAlert={handleShowErrorAlert}
                onCancelClick={() => removeMember(member.Id)}
                saveNewMember={saveNewMember}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    );
  };

  return (
    <Box
      py={2}
      sx={{ width: "100%", px: { xxs: 0, xs: 0, sm: 2, md: 2, lg: 2 } }}
    >
      <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
        Miembros del Hogar
      </Typography>
      <Box pb={1}>
        <Grid container sx={{ width: "100%" }}>
          <Grid item xxs={12} xs={12} sm={12} md={12} lg={12}>
            <Typography mb={{ xxs: 1, xs: 1, sm: 1 }} sx={{ mt: 1, px: 1 }}>
              {"¿Tiene hijos o más familiares en su vivienda?"}
            </Typography>
          </Grid>
          <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ pt: 1 }}>
            <FormControl label="">
              <RadioGroup
                controlid="selectedHasMembers"
                row
                xxs={12}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{ width: "100%", justifyContent: "space-between", px: 1 }}
                onChange={(event) => setHasMembers(event.target.value)}
                value={hasMembers}
              >
                <FormControlLabel
                  name="hasMembersController"
                  control={<Radio value={true} />}
                  label={"Si"}
                />
                <FormControlLabel
                  name="hasMembersController"
                  control={<Radio value={false} />}
                  label={"No"}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {hasMembers && (
        <Box>
          <Grid container display={"flex"} direction={"column"}>
            <Grid
              item
              xxs={12}
              xs={12}
              sm={6}
              md={3}
              lg={3}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              p={2}
              sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
            >
              <Fab
                color="primary"
                variant="extended"
                size="large"
                onClick={addMember}
              >
                <AddIcon sx={{ mr: 1 }} />
                Añadir miembro
              </Fab>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6}>
              {renderMembersContent()}
            </Grid>
          </Grid>
        </Box>
      )}
      <FormActions
        isLastStep={isLastStep}
        isCreate={isCreate}
        isUpdate={isUpdate}
        showErrorAlert={showErrorAlert}
        handleShowErrorAlert={handleShowErrorAlert}
        showCreatedAlert={showCreatedAlert}
        handleShowCreatedAlert={handleShowCreatedAlert}
        showUpdatedAlert={showUpdatedAlert}
        handleShowUpdatedAlert={handleShowUpdatedAlert}
        onClickonCancelClick={onCancelClick}
        onClickSubmit={() => onSubmitFunction(members)}
        onUpdateClickSubmit={() => onUpdateClickSubmit(members)}
      />
    </Box>
  );
};

BeneficiaryMembersForm.propTypes = {
  isLastStep: PropTypes.any,
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingBeneficiaryMembers: PropTypes.array,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  handleShowErrorAlert: PropTypes.func,
  handleShowCreatedAlert: PropTypes.func,
  handleShowUpdatedAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSubmitFunction: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
};

BeneficiaryMembersForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingMember: null,
};

export default BeneficiaryMembersForm;
