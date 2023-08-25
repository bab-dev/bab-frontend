import * as Yup from "yup";

const transportRequestValidationSchema = Yup.object().shape({
  idDepartment: Yup.string().required("IDDepartment is required"),
  idCoordinator: Yup.number().required("IDCoordinator is required"),
  transportType: Yup.number().required("TransportType is required"),
  placeType: Yup.number().required("PlaceType is required"),
  idPlace: Yup.string().required("IDPlace is required"),
  date: Yup.date().required("Date is required"),
  timeRange: Yup.string().required("TimeRange is required"),
  detail: Yup.string().required("Detail is required"),
  observations: Yup.string(),
  priority: Yup.number().required("Priority is required"),
  status: Yup.number(),
  commentByDirector: Yup.string(),
});

export default transportRequestValidationSchema;
