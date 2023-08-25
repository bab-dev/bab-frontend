import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useMediaQuery,
  Box,
  Fab,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import MarketSellerDialog from "components/dialogs/MarketSellerDialog";
import MarketSellersTable from "components/tables/MarketSellerTable";

import { variables } from "variables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import FormField from "components/FormField";
import SearchBar from "components/SearchBar";
import CustomExportButton from "components/CustomExportButton";
import { exportVariables, tables } from "variables/tableVariables";
import { headCells } from "variables/marketSellerVariables";
import theme from "theme";

const MarketSellersPage = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [openDialog, setOpenDialog] = useState(false);

  const [marketSellers, setMarketSellers] = useState([]);
  const [tableCount, setTableCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idProductCategory, setIdProductCategory] = useState("");
  const [filterName, setFilterName] = useState("");

  const [orderByColumn, setOrderByColum] = useState("Name"); //property
  const [orderDirection, setOrderDirection] = useState("asc"); //direction
  const [orderByParam, setOrderByParam] = useState("");

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

  const handleRequestSort = (event, property) => {
    const isAsc =
      orderByColumn === property && orderDirection === variables.ASC;
    const toggledOrder = isAsc ? variables.DESC : variables.ASC;
    setOrderDirection(toggledOrder);
    setOrderByColum(property);
  };

  const getMarketSellers = async () => {
    const response = await axiosPrivate
      .get(`${variables.MARKET_SELLER_URL}`, {
        params: {
          name: filterName == "" ? null : filterName,
          idProductCategory:
            idProductCategory == "all" ? null : idProductCategory,
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
    setMarketSellers(response.data);

    //Set pagination params
    var paginationHeaders = response.headers["x-pagination"];
    var parsedPaginationHeaders = JSON.parse(paginationHeaders);
    setTableCount(parsedPaginationHeaders.TotalCount);
  };

  useEffect(() => {
    if (orderByColumn != "" && orderDirection != "") {
      setOrderByParam(`${orderByColumn} ${orderDirection}`);
    }

    getMarketSellers();
  }, [
    filterName,
    idProductCategory,
    page,
    rowsPerPage,
    orderByColumn,
    orderDirection,
  ]);

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
            COMERCIANTES
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
        <Grid
          container
          item
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
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
            justifyContent={"flex-end"}
            sx={{ px: { xxs: 0, xs: 0, sm: 0 } }}
          >
            <SearchBar
              value={filterName}
              onChange={(e) => handleFilterByName(e)}
              placeholder={"Buscar por Nombre"}
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
            justifyContent={"flex-end"}
          >
            <FormField
              required={true}
              select={true}
              label={"Categoría del Producto"}
              name={"idProductCategory"}
              defaultValue={"all"}
              onChange={(event) => setIdProductCategory(event.target.value)}
            >
              <MenuItem key={`allCategories`} value={"all"}>
                {"Todos"}
              </MenuItem>
              {state.productCategory.productCategories.map(
                (productCategory) => (
                  <MenuItem key={productCategory.Id} value={productCategory.Id}>
                    {productCategory.ProductCategoryName}
                  </MenuItem>
                )
              )}
            </FormField>
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
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
              {isMediumScreen ? "Registrar" : "Crear Comerciante"}
            </Fab>
          </Grid>

          <MarketSellerDialog
            isCreate
            isUpdate={false}
            open={openDialog}
            setOpen={setOpenDialog}
            onCancelClick={() => setOpenDialog(false)}
            getMarketSellers={getMarketSellers}
          />
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
            id="exportMarketSellersButton"
            className="exportButton"
            table={tables.MARKET_SELLER_TABLE} // ID of the table to be exported
            filename="Comerciantes"
            sheet={exportVariables.SHEET_1}
            buttonText={exportVariables.EXPORT_TO_EXCEL}
          />
        </Grid>
        <Grid container item display={"flex"} sx={{ my: 4 }}>
          <MarketSellersTable
            isEditable
            headCells={headCells}
            dataList={marketSellers}
            tableCount={tableCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={handleRequestSort}
            getMarketSellers={getMarketSellers}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketSellersPage;
