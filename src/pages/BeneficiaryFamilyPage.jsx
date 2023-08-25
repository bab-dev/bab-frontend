import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import PersonBeneficiaryFamilyDialog from "components/dialogs/PersonBeneficiaryFamilyDialog";
import PersonBeneficiaryFamilyTable from "components/tables/PersonBeneficiaryFamilyTable";

import { variables } from "variables";
import {
  headCells,
  housingTypes,
} from "variables/beneficiariesFamiliesVariables";

import SearchBar from "components/SearchBar";
import FormField from "components/FormField";
import { deleteNewPersonBeneficiaryData } from "actions/newBeneficiaryFamilyActions";

import CustomExportButton from "components/CustomExportButton";
import { exportVariables, tables } from "variables/tableVariables";
import theme from "theme";

const BeneficiaryFamilyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialg] = useState(false);

  const [personBeneficiaryFamilies, setPersonBeneficiaryFamilies] = useState(
    []
  );
  const [tableCount, setTableCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterName, setFilterName] = useState("");
  const [housingType, setHousingType] = useState("all");

  const [orderByColumn, setOrderByColum] = useState(""); //property
  const [orderDirection, setOrderDirection] = useState("asc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    var rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPage(1); //Reset pageNumber value
  };

  const handleFilterByName = (event) => {
    setPage(1);
    setFilterName(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderByColumn === property && orderDirection === variables.ASC;
    const toggledOrder = isAsc ? variables.DESC : variables.ASC;
    setOrderDirection(toggledOrder);
    setOrderByColum(property);
  };

  const getBeneficiaryFamilies = async () => {
    const response = await axiosPrivate
      .get(`${variables.BENEFICIARY_FAMILY_URL}`, {
        params: {
          name: filterName == "" ? null : filterName,
          housingType: housingType == "all" ? null : housingType,
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
    setPersonBeneficiaryFamilies(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }
    getBeneficiaryFamilies();
  }, [
    filterName,
    housingType,
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
  ]);

  const handleOpenDialog = () => {
    dispatch(deleteNewPersonBeneficiaryData());
    setOpenDialg(true);
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(deleteNewPersonBeneficiaryData());
  };

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
          <Fab color="primary" onClick={handleBack} size="medium">
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
            FAMILIAS
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
            md={4}
            lg={4}
            p={2}
            width={"100%"}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <SearchBar
              value={filterName}
              onChange={(e) => handleFilterByName(e)}
              placeholder={"Buscar por Nombre o CI del Beneficiario "}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{ pl: { md: 4, lg: 4 }, pr: { md: 2, lg: 2 } }}
            display={"flex"}
          >
            <FormField
              select={true}
              label={"Tipo de Vivienda"}
              name={"housingType"}
              defaultValue={"all"}
              onChange={(event) => setHousingType(event.target.value)}
            >
              <MenuItem key={`allHousingTypes`} value={"all"}>
                {"Todos"}
              </MenuItem>
              {housingTypes.map((type) => (
                <MenuItem key={`HousingType:${type.name}`} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </FormField>
          </Grid>{" "}
          <Grid
            container
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
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
              onClick={handleOpenDialog}
            >
              <AddIcon sx={{ mr: 1 }} />
              {isMediumScreen ? "Registrar" : "Crear Beneficiario"}
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
            id="exportPersonBeneficiaryFamiliesButton"
            className="exportButton"
            table={tables.PERSON_BENEFICIARY_FAMILY_TABLE} // ID of the table to be exported
            filename="BeneficiariosFamilias"
            sheet={exportVariables.SHEET_1}
            buttonText={exportVariables.EXPORT_TO_EXCEL}
          />
        </Grid>
        <Grid container item display={"flex"} sx={{ my: 4 }}>
          <PersonBeneficiaryFamilyTable
            isEditable
            headCells={headCells}
            dataList={personBeneficiaryFamilies}
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={handleRequestSort}
            onClose={() => setOpenDialg(false)}
            getBeneficiaryFamilies={getBeneficiaryFamilies}
          />
        </Grid>
      </Grid>
      <PersonBeneficiaryFamilyDialog
        isCreate
        open={openDialog}
        setOpen={setOpenDialg}
        onClose={() => setOpenDialg(false)}
        getBeneficiaryFamilies={getBeneficiaryFamilies}
      />
    </Box>
  );
};

export default BeneficiaryFamilyPage;
