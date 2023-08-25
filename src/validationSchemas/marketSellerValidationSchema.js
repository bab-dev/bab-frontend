import * as Yup from "yup";

const MarketSellerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("LastName is required"),
  marketName: Yup.string().required("MarketName is required"),
  phoneNumber: Yup.number().required("PhoneNumber is required"),
  idProductCategory: Yup.string().required("ProductCategory is required"),
});

export default MarketSellerValidationSchema;
