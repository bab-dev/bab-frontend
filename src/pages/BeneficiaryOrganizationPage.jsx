import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import {
  useMediaQuery,
  Box,
  Fab,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { variables } from "variables";
import { exportVariables, tables } from "variables/tableVariables";
import { headCells } from "variables/organizationVariables";

import BeneficiaryOrganizationDialog from "components/dialogs/BeneficiaryOrganizationDialog";
import BeneficiaryOrganizationTable from "components/tables/BeneficiaryOrganizationTable";
import SearchBar from "components/SearchBar";
import FormField from "components/FormField";
import CustomExportButton from "components/CustomExportButton";

import theme from "theme";

const BeneficiaryOrganizationPage = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialg] = useState(false);

  const [organizations, setOrganizations] = useState([]);
  const [tableCount, setTableCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [organizationName, setOrganizationName] = useState(""); //searching
  const [organizationType, setOrganizationType] = useState(""); //filtering
  const [idCoordinator, setIdCoordinator] = useState("");

  const [orderByColumn, setOrderByColum] = useState(""); //property
  const [orderDirection, setOrderDirection] = useState("asc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

  const isLargeScreen = useMediaQuery("(max-width: 1280px)");

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    var rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPage(1); //Reset pageNumber value
  };

  const handleSearchByOrganizationName = (event) => {
    setPage(1);
    setOrganizationName(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderByColumn === property && orderDirection === variables.ASC;
    const toggledOrder = isAsc ? variables.DESC : variables.ASC;
    setOrderDirection(toggledOrder);
    setOrderByColum(property);
  };

  const getBeneficiaryOrganizations = async () => {
    const response = await axiosPrivate
      .get(`${variables.BENEFICIARY_ORGANIZATION_URL}`, {
        params: {
          organizationName: organizationName == "" ? null : organizationName,
          organizationType: organizationType == "all" ? null : organizationType,
          idCoordinator: idCoordinator == "" ? null : idCoordinator,
          pageSize: rowsPerPage,
          pageNumber: page,
          orderBy: orderByParam,
        },
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
    setOrganizations(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    getBeneficiaryOrganizations();
  }, [
    organizationName,
    organizationType,
    idCoordinator,
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
  ]);

  return (
    <Box px="calc(10% - 5px)" py="calc(5% - 5px)">
      <Grid
        container
        item
        justifyContent="flex-start"
        display={"flex"}
        alignItems={"center"}
        sx={{
          pb: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
          mt: 1,
        }}
      >
        <Grid
          item
          sx={{
            pr: { xxs: 2, xs: 2, sm: 2, md: 4, lg: 4 },
          }}
        >
          <Fab color="primary" onClick={() => navigate(-1)} size="medium">
            <ArrowBackIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            sx={{
              fontSize: "1rem",
              [theme.breakpoints.up("xs")]: {
                fontSize: "1rem",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "1.5rem",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "1.5rem",
              },
              [theme.breakpoints.up("lg")]: {
                fontSize: "2rem",
              },
              [theme.breakpoints.up("xl")]: {
                fontSize: "2rem",
              },
              fontStyle: "italic",
            }}
          >
            ORGANIZACIONES
          </Typography>{" "}
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        flexWrap={"nowrap"}
        direction={"column"}
        px="calc(8% - 10px)"
        mb={4}
      >
        <Grid
          container
          item
          justifyContent={"space-between"}
          justifyItems={"space-between"}
          display={"flex"}
          flexWrap={"nowrap"}
          direction={{
            xxs: "column",
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          }}
        >
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            p={2}
            width={"100%"}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <SearchBar
              value={organizationName}
              onChange={(e) => handleSearchByOrganizationName(e)}
              placeholder={"Buscar por Nombre"}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Tipo de Organización"}
              name={"organizationType"}
              defaultValue={"all"}
              onChange={(event) => setOrganizationType(event.target.value)}
            >
              <MenuItem key={`allOrganizationTypes`} value={"all"}>
                {"Todos"}
              </MenuItem>
              {variables.BENEFICIARY_TYPE.map((type) => (
                <MenuItem
                  key={`OrganizationType:${type.name}`}
                  value={type.value}
                >
                  {type.label}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Coordinador BAB"}
              name={"idCoordinator"}
              defaultValue={"all"}
              onChange={(event) => setIdCoordinator(event.target.value)}
            >
              <MenuItem key={`allCoordinators`} value={"all"}>
                {"Todos"}
              </MenuItem>
              {state.volunteer.volunteers.map((volunteer) => (
                <MenuItem
                  key={volunteer.IdVolunteer}
                  value={volunteer.IdVolunteer}
                >
                  {volunteer.FullName}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid
            container
            item
            xxs={12}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            justifyItems={"flex-end"}
            p={2}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <Fab
              color="primary"
              variant="extended"
              size="large"
              onClick={() => setOpenDialg(true)}
            >
              <AddIcon sx={{ mr: 1 }} />

              {isLargeScreen ? "Registrar" : "Crear Organización"}
            </Fab>
          </Grid>
        </Grid>
        <Grid
          container
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
          sx={{ pt: 2, pb: 1 }}
        >
          <CustomExportButton
            id="exportBeneficiaryOrganizationsButton"
            className="exportButton"
            table={tables.BENEFICIARY_ORGANIZATION_TABLE} // ID of the table to be exported
            filename="OrganizacionesBeneficiarias"
            sheet={exportVariables.SHEET_1}
            buttonText={exportVariables.EXPORT_TO_EXCEL}
          />
        </Grid>
        <Grid container item display={"flex"} sx={{ my: 4 }}>
          <BeneficiaryOrganizationTable
            isEditable
            headCells={headCells}
            dataList={organizations}
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={handleRequestSort}
            onClose={() => setOpenDialg(false)}
            getBeneficiaryOrganizations={getBeneficiaryOrganizations}
          />
        </Grid>
      </Grid>
      <BeneficiaryOrganizationDialog
        isCreate
        open={openDialog}
        setOpen={setOpenDialg}
        onCancelClick={() => setOpenDialg(false)}
        getBeneficiaryOrganizations={getBeneficiaryOrganizations}
      />
    </Box>
  );
};

export default BeneficiaryOrganizationPage;
