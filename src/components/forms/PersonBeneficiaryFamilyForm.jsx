import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "variables";

import PersonForm from "./PersonForm";
import BeneficiaryFamilyForm from "./BeneficiaryFamilyForm";
import BeneficiaryMembersForm from "./BeneficiaryMembersForm";
import StepperComponent from "components/Stepper";

import {
  addBeneficiaryPerson,
  addBeneficiaryFamily,
  deleteNewPersonBeneficiaryData,
} from "actions/newBeneficiaryFamilyActions";

import { steps } from "variables/beneficiariesFamiliesVariables";

const PersonBeneficiaryFamilyForm = ({
  isCreate,
  isUpdate,
  isSignUp,
  existingBeneficiary,
  setOpen,
  showErrorAlert,
  setShowErrorAlert,
  showCreatedAlert,
  setShowCreatedAlert,
  showUpdatedAlert,
  setShowUpdatedAlert,
  getBeneficiaryFamilies,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const [activeStep, setActiveStep] = useState(0);

  const createPersonBeneficiaryFamily = async (data) => {
    try {
      await axiosPrivate
        .post(
          variables.PERSON_BENEFICIARIES,
          JSON.stringify({
            person: data.person,
            beneficiaryFamily: data.beneficiaryFamily,
            members: data.members
              ? Array.isArray(data.members)
                ? data.members
                : [data.members]
              : [],
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getBeneficiaryFamilies();
          dispatch(deleteNewPersonBeneficiaryData());
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            setShowErrorAlert(true);
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const updatePersonBeneficiaryFamily = async (data) => {
    try {
      await axiosPrivate
        .put(
          `${variables.PERSON_BENEFICIARIES}/${existingBeneficiary.BeneficiaryFamily.Id}`,
          JSON.stringify({
            Person: data.person,
            BeneficiaryFamily: data.beneficiaryFamily,
            Members: data.members,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getBeneficiaryFamilies();
          dispatch(deleteNewPersonBeneficiaryData());
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            setShowErrorAlert(true);
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const handleNext = (values) => {
    switch (activeStep) {
      case 0:
        dispatch(addBeneficiaryPerson(values));
        break;
      case 1:
        dispatch(addBeneficiaryFamily(values));
        if (isCreate) {
          dispatch(addBeneficiaryFamily(values));
        }
        if (isUpdate) {
          dispatch(
            addBeneficiaryFamily({
              IDPerson: existingBeneficiary.BeneficiaryFamily.IDPerson,
              ...values,
            })
          );
        }
        break;
      default:
        break;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    if (activeStep == 0) {
      setOpen(false);
    }
  };

  const handleFormSubmit = async (membersToCreate) => {
    await createPersonBeneficiaryFamily({
      ...state.newPersonBeneficiary,
      members: membersToCreate,
    });
  };

  const handleUpdateFormSubmit = async (prevMembers) => {
    if (state.newPersonBeneficiary) {
      await updatePersonBeneficiaryFamily({
        person: { ...state.newPersonBeneficiary.person },
        beneficiaryFamily: { ...state.newPersonBeneficiary.beneficiaryFamily },
        members: [...prevMembers],
      });
    }
  };

  const closeDialogs = () => {
    setShowErrorAlert(false);
    setShowCreatedAlert(false);
    setShowUpdatedAlert(false);
    setOpen(false);

    // Delete new/updated data from beneficiary when cloding the dialog
    dispatch(deleteNewPersonBeneficiaryData());
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonForm
            isCreate={isCreate}
            isUpdate={isUpdate}
            isSignUp={isSignUp}
            existingPerson={
              existingBeneficiary ? existingBeneficiary.Person : null
            }
            onCancelClick={handleBack}
            onSubmitFunction={handleNext}
            onUpdateClickSubmit={handleNext}
          />
        );

      case 1:
        return (
          <BeneficiaryFamilyForm
            isCreate={isCreate}
            isUpdate={isUpdate}
            existingBeneficiaryFamily={
              existingBeneficiary ? existingBeneficiary.BeneficiaryFamily : null
            }
            onCancelClick={handleBack}
            onSubmitFunction={handleNext}
            onUpdateClickSubmit={handleNext}
          />
        );
      case 2:
        return (
          <BeneficiaryMembersForm
            isCreate={isCreate}
            isUpdate={isUpdate}
            isLastStep={activeStep >= steps.length - 1}
            existingBeneficiaryMembers={
              existingBeneficiary ? existingBeneficiary.Members : []
            }
            showErrorAlert={showErrorAlert}
            handleShowErrorAlert={() => setShowErrorAlert(false)}
            showCreatedAlert={showCreatedAlert}
            handleShowCreatedAlert={closeDialogs}
            showUpdatedAlert={showUpdatedAlert}
            handleShowUpdatedAlert={closeDialogs}
            onCancelClick={handleBack}
            onSubmitFunction={handleFormSubmit}
            onUpdateClickSubmit={handleUpdateFormSubmit}
          />
        );
      default:
        return null;
    }
  };
  return (
    <StepperComponent
      activeStep={activeStep}
      steps={steps}
      content={renderContent()}
    />
  );
};

PersonBeneficiaryFamilyForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isSignUp: PropTypes.bool,
  existingBeneficiary: PropTypes.object,
  setOpen: PropTypes.func,
  showErrorAlert: PropTypes.bool,
  setShowErrorAlert: PropTypes.func,
  showCreatedAlert: PropTypes.bool,
  setShowCreatedAlert: PropTypes.func,
  showUpdatedAlert: PropTypes.bool,
  setShowUpdatedAlert: PropTypes.func,
  getBeneficiaryFamilies: PropTypes.func,
};

PersonBeneficiaryFamilyForm.defaultProps = {
  isSignUp: false,
  isCreate: false,
  isUpdate: false,
  existingBeneficiary: null,
};

export default PersonBeneficiaryFamilyForm;
