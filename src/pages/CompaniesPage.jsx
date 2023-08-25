import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "../variables.js";

import { useMediaQuery, Box, Fab, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CompanyDialog from "components/dialogs/CompanyDialog";
import CompanyCard from "components/cards/CompanyCard";
import TablePaginator from "components/tables/TablePaginator.jsx";
import SearchBar from "components/SearchBar.jsx";
import theme from "theme.js";

import { setCompanies } from "actions/companyActions.js";

const CompaniesPage = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialog] = useState(false);
  const isNotFound = !state.company.companies.length;

  //Query params to be sent in GET request
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [tableCount, setTableCount] = useState(
    state.company.companies ? state.company.companies.length : 0
  );

  const isMediumScreen = useMediaQuery("(width: 912px)");

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

  const getAllCompanies = async () => {
    const response = await axiosPrivate
      .get(`${variables.COMPANY_URL}`, {
        params: {
          CompanyComercialName: filterName == "" ? null : filterName,
          PageSize: rowsPerPage,
          PageNumber: page,
        },
      })
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
    dispatch(setCompanies(response.data));

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  const deleteCompany = async (id) => {
    await axiosPrivate
      .delete(`${variables.COMPANY_URL}/${id}`)
      .then(getAllCompanies())
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  useEffect(() => {
    setTableCount(state.company.companies.length);
  }, [state.company.companies]);

  useEffect(() => {
    getAllCompanies();
  }, [filterName, page, rowsPerPage]);

  return (
    <Box px="calc(10% - 10px)" py="calc(5% - 5px)" flexGrow={1}>
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
            EMPRESAS
          </Typography>{" "}
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        flexWrap={"nowrap"}
        direction={"column"}
        px="calc(8% - 10px)"
      >
        <Grid container item display={"flex"} justifyContent="flex-end" mb={2}>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            p={2}
            width={"100%"}
            justifyContent={"flex-end"}
            sx={{ pr: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <SearchBar
              value={filterName}
              onChange={(e) => handleFilterByName(e)}
              placeholder={"Buscar por Nombre de Empresa"}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            xl={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            width={"100%"}
            p={2}
            pr={0}
          >
            <Fab
              color="primary"
              variant="extended"
              size="large"
              onClick={() => setOpenDialog(true)}
            >
              <AddIcon sx={{ mr: 1 }} />
              {isMediumScreen ? "Registrar" : "Crear Empresa"}
            </Fab>
          </Grid>
          <CompanyDialog
            isCreate
            isUpdate={false}
            open={openDialog}
            setOpen={setOpenDialog}
            onCancelClick={() => setOpenDialog(false)}
            getAllCompanies={getAllCompanies}
          />
        </Grid>
        <Grid
          container
          width="100%"
          display="flex"
          wrap="wrap"
          justifyItems={{
            xxs: "center",
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          }}
          justifyContent="space-between"
        >
          {state.company.companies.map((company) => (
            <Grid
              item
              key={company.Id}
              my={{ xxs: 2, xs: 2, sm: 2, md: 3, lg: 3 }}
              pl={{ xxs: 1, xs: 1, sm: 3 }}
              sx={{ cursor: "pointer" }}
              display={"flex"}
              justifyContent={{
                xxs: "center",
                xs: "center",
                sm: "flex-end",
                md: "flex-end",
                lg: "flex-end",
                xl: "flex-end",
              }}
              xxs={12}
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
            >
              <CompanyCard
                company={company}
                deleteCompany={() => deleteCompany(company.Id)}
              />
            </Grid>
          ))}
        </Grid>
        {isNotFound && (
          <Box my={4}>
            <Typography variant="h5" display={"flex"} justifyContent={"center"}>
              No se encontraron resultados &nbsp;
            </Typography>
          </Box>
        )}
        <Grid container mb={4}>
          <TablePaginator
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompaniesPage;
