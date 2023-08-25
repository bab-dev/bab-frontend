import * as Yup from "yup";

const DepartmentValidationSchema = Yup.object().shape({
  departmentName: Yup.string().required("DepartmentName is required"),
});

export default DepartmentValidationSchema;
