import { GET_DEPARTMENTS } from "../actionTypes/actionTypes";
import { variables } from "../variables.js";

const addDepartments = (departments) => {
  return {
    type: GET_DEPARTMENTS,
    payload: {
      departments: departments,
    },
  };
};

const fetchDepartments = () => {
  return async (dispatch) => {
    try {
      let promise = fetch(`${variables.API_URL}${variables.DEPARTMENT_URL}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          return result;
        });

      let departments = await promise;
      dispatch(addDepartments(departments));
    } catch (e) {
      console.log(`Exception: ${e}`);
    }
  };
};

export { addDepartments, fetchDepartments };
