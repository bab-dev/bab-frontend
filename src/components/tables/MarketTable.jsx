import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import TableHeader from "./TableHeader";

import { variables } from "variables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import ConfirmDialog from "components/dialogs/ConfirmDialog";

import MarketDialog from "components/dialogs/MarketDialog";
import ModifyMenu from "components/menus/ModifyMenu";

const MarketTable = ({ isEditable, headCells, dataList, getMarkets }) => {
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length;
  const [openMenu, setOpenMenu] = useState(false);
  const [openMarketDialog, setOpenMarketDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedMarketId, setSelectedMarketId] = useState("");
  const [existingMarket, setExistingMarket] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event, idMarket) => {
    setAnchorEl(event.currentTarget);
    setSelectedMarketId(idMarket);
    setOpenMenu(true);
  };

  useEffect(() => {
    const getSelectedMarket = async () => {
      if (selectedMarketId != "") {
        try {
          const response = await axiosPrivate.get(
            `${variables.MARKET_URL}/${selectedMarketId}`
          );
          setExistingMarket(response.data);
        } catch (error) {
          console.error(`Error fetching markets: ${error}`);
        }
      }
    };
    getSelectedMarket();
  }, [selectedMarketId]);

  const deleteMarket = async () => {
    if (existingMarket) {
      await axiosPrivate
        .delete(`${variables.MARKET_URL}/${existingMarket.Id}`)
        .then(() => {
          getMarkets();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    }
  };

  const handleClose = () => {
    setOpenMarketDialog(false);
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
        <Table>
          <TableHeader headCells={headCells} />
          <TableBody>
            {dataList.map((row) => {
              return (
                <TableRow
                  hover
                  key={row.Id}
                  tabIndex={-1}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left" sx={{ minWidth: "160px" }}>
                    <Typography color={"black"}>{row.MarketName}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>{row.Address}</Typography>
                  </TableCell>
                  {isEditable && (
                    <TableCell sx={{ width: "80px" }}>
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
                </TableRow>
              );
            })}
            <ModifyMenu
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              anchorEl={anchorEl}
              onUpdateClick={() => setOpenMarketDialog(true)}
              onDeleteClick={() => setOpenConfirmDialog(true)}
            />
            <MarketDialog
              isUpdate
              open={openMarketDialog}
              setOpen={setOpenMarketDialog}
              existingMarket={existingMarket}
              onCancelClick={handleClose}
              getMarkets={getMarkets}
            />
            <ConfirmDialog
              title="Eliminar Mercado"
              open={openConfirmDialog}
              setOpen={setOpenConfirmDialog}
              onConfirm={deleteMarket}
              successMessage={"Se ha eliminado correctamente!"}
              onClose={() => setOpenConfirmDialog(false)}
            >
              ¿Está seguro de que quiere eliminar este departamento?
            </ConfirmDialog>
          </TableBody>
          {isNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="left" colSpan={6} sx={{ py: 3 }}>
                  <Typography variant="h6">
                    No se encontraron resultados &nbsp;
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

MarketTable.propTypes = {
  isEditable: PropTypes.bool,
  headCells: PropTypes.array,
  dataList: PropTypes.array,
  getMarkets: PropTypes.func,
};

export default MarketTable;
