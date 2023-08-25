import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "reducers/tokenReducer.js";
import userReducer from "../reducers/userReducer.js";
import rootReducer from "reducers/appReducer.js";
import departmentsReducer from "reducers/departmentsReducer.js";
import newPersonVolunteerReducer from "reducers/newPersonVolunteerReducer.js";
import volunteerReducer from "reducers/volunteerReducer.js";
import companyReducer from "reducers/companyReducer.js";
import productCategoriesReducer from "reducers/productCategoriesReducer.js";
import selectedPersonVolunteerReducer from "reducers/selectedPersonVolunteerReducer.js";
import eventsReducer from "reducers/eventsReducer..js";
import newPersonBeneficiaryReducer from "reducers/newPersonBeneficiaryReducer.js";
import marketReducer from "reducers/marketReducer.js";
import beneficiaryOrganizationReducer from "reducers/beneficiaryOrganizationReducer.js";
import tripReducer from "reducers/tripReducer.js";
import transportReducer from "reducers/transportReducer.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    signOut: rootReducer,
    department: departmentsReducer,
    company: companyReducer,
    market: marketReducer,
    productCategory: productCategoriesReducer,
    beneficiaryOrganization: beneficiaryOrganizationReducer,
    volunteer: volunteerReducer,
    newPersonVolunteer: newPersonVolunteerReducer,
    selectedPersonVolunteer: selectedPersonVolunteerReducer,
    events: eventsReducer,
    newPersonBeneficiary: newPersonBeneficiaryReducer,
    trip: tripReducer,
    transport: transportReducer,
  },
});
