import * as Yup from "yup";

const BeneficiaryOrganizationValidationSchema = Yup.object().shape({
  idCoordinator: Yup.number().required("IDCoordinator is required"),
  organizationName: Yup.string().required("OrganizationName is required"),
  organizationType: Yup.number().required("OrganizationType is required"),
  program: Yup.string(),
  contractStartDate: Yup.date().required("ContractStartDate is required"),
  contractEndDate: Yup.date().required("ContractEndDate is required"),
  legalRepresentative: Yup.string().required("LegalRepresentative is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.number().required("PhoneNumber is required"),
  totalPopulation: Yup.number().required("TotalPopulation is required"),
  observations: Yup.string(),
});

export default BeneficiaryOrganizationValidationSchema;
