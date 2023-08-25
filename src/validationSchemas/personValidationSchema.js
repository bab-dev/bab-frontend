import * as Yup from "yup";
//import moment from "moment";

const personValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("FirstName is required")
    .max(25, "FirstName must not exceed 25 characters"),
  middleName: Yup.string().max(25, "MiddleName must not exceed 25 characters"),
  firstSurname: Yup.string()
    .required("FirstSurname is required")
    .max(25, "FirstSurname must not exceed 25 characters"),
  secondSurname: Yup.string().max(
    25,
    "SecondSurname must not exceed 25 characters"
  ),
  /*dateOfBirth: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? moment(originalValue, "YYYY-MM-DD").toDate() : null
    )
    .required("DateOfBirth is required"),*/
  dateOfBirth: Yup.date().required("DateOfBirth is required"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(150, "Address must not exceed 150 characters"),
  city: Yup.string()
    .required("City is required")
    .max(25, "City must not exceed 150 characters"),
  email: Yup.string().email("Email is invalid"),
  phoneNumber: Yup.number().required("PhoneNumber is required"),
  occupation: Yup.string()
    .required("Occupation is required")
    .max(150, "Occupation must not exceed 150 characters"),
  ci: Yup.number().required("CI is required"),
});

export default personValidationSchema;
