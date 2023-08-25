import * as Yup from "yup";

const EventValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  idDepartment: Yup.string().required("IDDepartment is required"),
  eventDescription: Yup.string().required("EventDescription is required"),
  eventType: Yup.number().required("EventType is required"),
  start: Yup.date().required("StartDate is required"),
  end: Yup.date().required("EndDate is required"),
  observations: Yup.string(),
  numberOfVolunteersRequired: Yup.number(),
});

export default EventValidationSchema;
