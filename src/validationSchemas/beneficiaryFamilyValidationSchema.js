import * as Yup from "yup";

const BeneficiaryFamilyValidationSchema = Yup.object().shape({
  beneficiaryType: Yup.number().required("BeneficiaryType is required"),
  housingType: Yup.number().required("HousingType is required"),
  registrationDate: Yup.date().required("RegistrationDate is required"),
  zone: Yup.string().required("Zone is required"),
  observations: Yup.string(),
});

export default BeneficiaryFamilyValidationSchema;
