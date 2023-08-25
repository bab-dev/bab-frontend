import * as Yup from "yup";

const CompanyValidationSchema = Yup.object().shape({
  companyComercialName: Yup.string().required(
    "CompanyComercialName is required"
  ),
  address: Yup.string().required("Address is required"),
  businessName: Yup.string().required("BusinessName is required"),
  representative: Yup.string().required("Representative is required"),
  representativePosition: Yup.string().required(
    "RepresentativePosition is required"
  ),
  phoneNumber: Yup.number().required("PhoneNumber is required"),
  email: Yup.string().required("Email is required"),
  imageURL: Yup.string().required("ImageURL is required"),
});

export default CompanyValidationSchema;
