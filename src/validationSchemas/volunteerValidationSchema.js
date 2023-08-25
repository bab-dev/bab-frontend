import * as Yup from "yup";

const volunteerValidationSchema = Yup.object().shape({
  idDepartment: Yup.string().required("IdDepartment is required"),
  role: Yup.number().required("Role is required"),
  category: Yup.number().required("Category is required"),
  group: Yup.string().max(45, "Group must not exceed 25 characters"),
  isVaccinated: Yup.bool().required("IsVaccinated is required"),
});

export default volunteerValidationSchema;
