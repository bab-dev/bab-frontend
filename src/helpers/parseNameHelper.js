import { volunteerVariables } from "variables/volunteerVariables.js";

const getRoleName = (roleValue) => {
  var roleName = volunteerVariables.VOLUNTEER_ROLES.find(
    (role) => role.value == roleValue
  );
  return roleName.label;
};

const getFullName = (obj) => {
  return `${obj.FirstName} ${obj.MiddleName} ${obj.FirstSurname} ${obj.SecondSurname}`;
};

export { getRoleName, getFullName };
