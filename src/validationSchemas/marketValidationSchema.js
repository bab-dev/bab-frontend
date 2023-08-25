import * as Yup from "yup";

const MarketValidationSchema = Yup.object().shape({
  marketName: Yup.string().required("MarketName is required"),
  address: Yup.string().required("Addresss is required"),
});

export default MarketValidationSchema;
