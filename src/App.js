import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.js";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";

import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { variables } from "variables.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import NavBar from "components/NavBar.jsx";
import SignInDialog from "./components/SignInDialog.jsx";
import Footer from "components/Footer.jsx";

import Home from "./pages/Home.jsx";
import VolunteersPage from "pages/VolunteersPage.jsx";
import UserProfile from "pages/UserProfile.jsx";
import TransportPageCoordinatorView from "pages/TransportPageCoordinatorView.jsx";
import TransportPageDirectorView from "pages/TransportPageDirectorView.jsx";
import SuppliersPage from "pages/SuppliersPage.jsx";
import CompaniesPage from "pages/CompaniesPage.jsx";
import MarketSellersPage from "pages/MarketSellersPage.jsx";
import ActivitiesPage from "pages/ActivitiesPage.jsx";
import BeneficiaryFamilyPage from "pages/BeneficiaryFamilyPage.jsx";
import BeneficiaryOrganizationPage from "pages/BeneficiaryOrganizationPage.jsx";
import BeneficiariesPage from "pages/BeneficiariesPage.jsx";
import TripPage from "pages/TripPage.jsx";
import AttendancePage from "pages/AttendancePage.jsx";
import { getRoleName } from "helpers/parseNameHelper.js";
import DepartmentsPage from "pages/DepartmentsPage.jsx";
import MarketsPage from "pages/MarketPage.jsx";

function App() {
  const state = useSelector((state) => state);

  const isUserDataAvailable =
    state.user.isLogged && state.user.userData && state.user.userData.Person;

  //const isAdmin = state.user.roles.includes(variables.USER_ROLES.ADMIN);
  //const isUser = state.user.roles.includes(variables.USER_ROLES.USER);
  // const hasEditPermission = state.user.permissions.includes('edit');
  // const hasDeletePersmission = state.user.permissions.includes('delete');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isUserDataAvailable && (
          <NavBar
            userFullName={`${state.user.userData.Person.FirstName} ${state.user.userData.Person.FirstSurname}`}
            volunteerRole={getRoleName(state.user.userData.Volunteer.Role)}
          />
        )}
        <Routes>
          <Route path="/" element={<SignInDialog />} />
          <Route path={`/${variables.SIGN_IN}`} element={<SignInDialog />} />
          <Route path={`/${variables.HOME_URL}`} element={<Home />} />
          <Route
            path={`/${variables.VOLUNTEER_URL}`}
            element={<VolunteersPage />}
          />

          <Route
            path={`/${variables.TRANSPORT_COORDINATOR_VIEW}`}
            element={<TransportPageCoordinatorView />}
          />
          <Route
            path={`/${variables.TRANSPORT__URL}`}
            element={<TransportPageDirectorView />}
          />
          <Route
            path={`/${variables.SUPPLIER_URL}`}
            element={<SuppliersPage />}
          />
          <Route
            path={`/${variables.COMPANY_URL}`}
            element={<CompaniesPage />}
          />
          <Route
            path={`/${variables.MARKET_SELLER_URL}`}
            element={<MarketSellersPage />}
          />
          <Route
            path={`/${variables.CALENDAR_URL}`}
            element={<ActivitiesPage />}
          />
          <Route
            path={`/${variables.BENEFICIARY_FAMILY_URL}`}
            element={<BeneficiaryFamilyPage />}
          />
          <Route
            path={`/${variables.BENEFICIARY_ORGANIZATION_URL}`}
            element={<BeneficiaryOrganizationPage />}
          />
          <Route
            path={`/${variables.BENEFICIARIES_URL}`}
            element={<BeneficiariesPage />}
          />
          <Route path={`/${variables.TRIP_URL}`} element={<TripPage />} />
          <Route
            path={`/${variables.ATTENDANCE_URL}`}
            element={<AttendancePage />}
          />
          <Route
            path={`/${variables.DEPARTMENT_URL}`}
            element={<DepartmentsPage />}
          />
          <Route path={`/${variables.MARKET_URL}`} element={<MarketsPage />} />
          {/* User routes */}
          <Route
            path={`/${variables.USER_PROFILE_URL}`}
            element={<UserProfile />}
          />
        </Routes>
        {state.user.isLogged && <Footer />}
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
