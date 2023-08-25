import * as Yup from "yup";

const ClockInValidationSchema = Yup.object().shape({
  idVolunteer: Yup.number().required("IDVolunteer is required"),
});

export default ClockInValidationSchema;
