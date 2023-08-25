import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import TableHeader from "./TableHeader";
import TablePaginator from "./TablePaginator";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "variables";

import ModifyMenu from "components/menus/ModifyMenu";
import ConfirmDialog from "components/dialogs/ConfirmDialog";
import MarketSellerDialog from "components/dialogs/MarketSellerDialog";

import { stringAvatar } from "helpers/avatarHelper";
import { tables } from "variables/tableVariables";

const MarketSellersTable = ({
  isEditable,
  headCells,
  dataList,
  tableCount,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  orderByColumn,
  orderDirection,
  onSortChange,
  getMarketSellers,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length;
  const [selectedMarketSellertId, setSelectedMarketSellerId] = useState("");
  const [existingMarketSeller, setExistingMarketSeller] = useState(null);

  const [openMenu, setOpenMenu] = useState(false);
  const [openMarketSellerDialog, setOpenMarketSellerDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const setFullName = (name, lastName) => {
    return `${name.split(" ")[0]} ${lastName.split(" ")[0]}`;
  };

  const handleOpenMenu = (event, marketSellerId) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
    setSelectedMarketSellerId(marketSellerId);
  };

  useEffect(() => {
    const getSelectedMarketSeller = async () => {
      if (selectedMarketSellertId != "") {
        try {
          await axiosPrivate
            .get(`${variables.MARKET_SELLER_URL}/${selectedMarketSellertId}`)
            .then((response) => {
              setExistingMarketSeller(response.data);
            })
            .catch((err) => {
              if (err.response) {
                const { status } = err.response;
                throw Error(`HTTP error: ${status}`);
              }
            });
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }
    };
    getSelectedMarketSeller();
  }, [selectedMarketSellertId]);

  const deleteMarketSeller = async (id) => {
    await axiosPrivate
      .delete(`${variables.MARKET_SELLER_URL}/${id}`)
      .catch((err) => {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      });
  };

  const handleClose = () => {
    setOpenMarketSellerDialog(false);
    setOpenConfirmDialog(false);
    setOpenMenu(false);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "0 2px 6px 0 #000000",
        p: 2,
      }}
      elevation={6}
    >
      <TableContainer>
        <Table id={tables.MARKET_SELLER_TABLE}>
          <TableHeader
            headCells={headCells}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={onSortChange}
          />
          <TableBody>
            {dataList.map((row) => {
              return (
                <TableRow key={row.Id} tabIndex={-1}>
                  <TableCell align="center">
                    <Avatar
                      sx={{ width: 56, height: 56 }}
                      alt={setFullName(row.Name, row.LastName)}
                      {...stringAvatar(
                        setFullName(row.Name, row.LastName),
                        false
                      )}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "160px" }}>
                    <Typography color={"black"}>{row.Name}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "200px" }}>
                    <Typography color={"black"}>{row.LastName}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>{row.MarketName}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "160px" }}>
                    <Typography color={"black"}>{row.PhoneNumber}</Typography>
                  </TableCell>

                  <TableCell align="left" sx={{ minWidth: "200px" }}>
                    <Typography color={"black"}>
                      {row.ProductCategoryName}
                    </Typography>
                  </TableCell>
                  {isEditable && (
                    <TableCell sx={{ width: "96px" }}>
                      <Grid
                        container
                        display={"flex"}
                        wrap="nowrap"
                        justifyContent={"space-around"}
                      >
                        <IconButton
                          aria-label="modify"
                          onClick={(event) => handleOpenMenu(event, row.Id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    </TableCell>
                  )}
                  <ModifyMenu
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    anchorEl={anchorEl}
                    onUpdateClick={() => setOpenMarketSellerDialog(true)}
                    onDeleteClick={() => setOpenConfirmDialog(true)}
                  />
                </TableRow>
              );
            })}
          </TableBody>
          <MarketSellerDialog
            isUpdate
            open={openMarketSellerDialog}
            setOpen={setOpenMarketSellerDialog}
            existingMarketSeller={existingMarketSeller}
            onCancelClick={handleClose}
            getMarketSellers={getMarketSellers}
          />
          <ConfirmDialog
            title="Eliminar Comerciante"
            open={openConfirmDialog}
            setOpen={setOpenConfirmDialog}
            onConfirm={() => deleteMarketSeller(selectedMarketSellertId)}
            successMessage={"Se ha eliminado correctamente!"}
            onClose={handleClose}
          >
            ¿Está seguro de que quiere eliminar este comerciante?
          </ConfirmDialog>
          {isNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <Typography variant="h6">
                    No se encontraron resultados &nbsp;
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePaginator
        tableCount={tableCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

MarketSellersTable.propTypes = {
  isEditable: PropTypes.bool,
  headCells: PropTypes.array,
  dataList: PropTypes.array,
  tableCount: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  onRowsPerPageChange: PropTypes.func,
  orderByColumn: PropTypes.string,
  orderDirection: PropTypes.oneOf([variables.ASC, variables.DESC]),
  onSortChange: PropTypes.func,
  getMarketSellers: PropTypes.func,
};

export default MarketSellersTable;
