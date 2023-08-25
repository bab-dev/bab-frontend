import * as Yup from "yup";
import { variables } from "../variables";

const dayTimes = [
  {
    name: "Mañana",
    value: "Morning",
  },
  {
    name: "Tarde",
    value: "Evening",
  },
  {
    name: "Noche",
    value: "Night",
  },
];

const volunteerAvailabilityValidationSchema = Yup.object().shape(
  variables.WEEKDAYS.reduce((schema, weekDay) => {
    dayTimes.forEach((dayTime) => {
      schema[`IsAvailable${weekDay.value}${dayTime.value}`] = Yup.boolean();
    });
    return schema;
  }, {})
);

export default volunteerAvailabilityValidationSchema;
