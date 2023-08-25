import * as Yup from "yup";

const tripValidationSchema = Yup.object().shape({
  idCoordinator: Yup.number().required("IDCoordinator is required"),
  idDepartment: Yup.string().required("IDDepartment is required"),
  vehicule: Yup.string().required("Vehicule is required"),
  date: Yup.date().required("Date is required"),
  numOfPassengers: Yup.number().required("NumOfPassengers is required"),
  transportType: Yup.number().required("TransportType is required"),
  departureType: Yup.number().required("DepartureType is required"),
  departureIDPlace: Yup.string().required("DeparturePlace is required"),
  departureTime: Yup.string().required("DepartureTime is required"),
  initialKm: Yup.number().required("InitialKm is required"),
  arrivalType: Yup.number().required("ArrivalType is required"),
  arrivalIDPlace: Yup.string().required("ArrivalPlace is required"),
  arrivalTime: Yup.string().required("ArrivalTime is required"),
  finalKm: Yup.number().required("FinalKm is required"),
});

export default tripValidationSchema;
