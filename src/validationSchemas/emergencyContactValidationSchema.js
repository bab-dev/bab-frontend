import * as Yup from "yup";

const emergencyContactValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(25, "Name must not exceed 25 characters"),
  lastName: Yup.string()
    .required("LastName is required")
    .max(25, "LastName must not exceed 25 characters"),
  phoneNumber: Yup.number()
    .required("PhoneNumber is required")
    .max(79999999, "PhoneNumber must not exceed 8 digits"),
  relationship: Yup.number().required("Relationship is required"),
});

export default emergencyContactValidationSchema;
