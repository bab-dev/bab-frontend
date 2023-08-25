import * as Yup from "yup";

const BeneficiaryFamilyMemberValidationSchema = Yup.object().shape({
  dateOfBirth: Yup.date().required("DateOfBirth is required"),
  gender: Yup.string().required("Gender is required"),
  hasDisability: Yup.bool().required("HasDisability is required"),
});

export default BeneficiaryFamilyMemberValidationSchema;
