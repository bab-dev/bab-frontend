import React from "react";
import { MenuItem } from "@mui/material";
import { tripVariables } from "variables/tripsVariables";

const getPlacesListByType = (state, placeType) => {
  switch (placeType) {
    case tripVariables.PLACE_TYPE[0].value: //COMPANY
      return state.company.companies.map((company) => (
        <MenuItem key={company.Id} value={company.Id}>
          {company.CompanyComercialName}
        </MenuItem>
      ));
    case tripVariables.PLACE_TYPE[1].value: //MARKET
      return state.market.markets.map((market) => (
        <MenuItem key={market.Id} value={market.Id}>
          {market.MarketName}
        </MenuItem>
      ));
    case tripVariables.PLACE_TYPE[2].value: //BENEFICIARY ORGANIZATION
      return state.beneficiaryOrganization.organizations.map((organization) => (
        <MenuItem key={organization.Id} value={organization.Id}>
          {organization.OrganizationName}
        </MenuItem>
      ));
    case tripVariables.PLACE_TYPE[3].value: //FOOD BANK BAB
      return (
        <MenuItem value={"c06edd1c-3a3f-4149-8d1a-27cb9c5c0766"}>
          {tripVariables.PLACE_TYPE[3].label}
        </MenuItem>
      );
    case tripVariables.PLACE_TYPE[4].value: //HIDROPONIC PLANT
      return (
        <MenuItem value={"b9634f83-62d0-4175-a244-ed156f64883c"}>
          {tripVariables.PLACE_TYPE[4].label}
        </MenuItem>
      );
    default:
      break;
  }
};

export { getPlacesListByType };
