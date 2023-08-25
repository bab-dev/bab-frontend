import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import TablePaginator from "./TablePaginator";

import { variables } from "variables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import BeneficiaryOrganizationDialog from "components/dialogs/BeneficiaryOrganizationDialog";
import ConfirmDialog from "components/dialogs/ConfirmDialog";
import ModifyMenu from "components/menus/ModifyMenu";
import { tables } from "variables/tableVariables";
import { formatDateWithBackslash } from "helpers/dateHelper";

const BeneficiaryOrganizationTable = ({
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
  getBeneficiaryOrganizations,
}) => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length;
  const [openMenu, setOpenMenu] = useState(false);
  const [openOrganizationDialog, setOpenOrganizationDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const [existingOrganization, setExistingOrganization] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event, idOrganization) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrganizationId(idOrganization);
    setOpenMenu(true);
  };

  const getSelectedOrganization = async () => {
    if (selectedOrganizationId != "") {
      try {
        const response = await axiosPrivate.get(
          `${variables.BENEFICIARY_ORGANIZATION_URL}/${selectedOrganizationId}`
        );
        setExistingOrganization(response.data);
      } catch (error) {
        console.error(`Error fetching beneficiary organizations: ${error}`);
      }
    }
  };

  useEffect(() => {
    getSelectedOrganization();
  }, [selectedOrganizationId]);

  const deleteOrganization = async () => {
    if (existingOrganization) {
      await axiosPrivate
        .delete(
          `${variables.BENEFICIARY_ORGANIZATION_URL}/${existingOrganization.Id}`
        )
        .then(() => {
          setOpenMenu(false);
          getBeneficiaryOrganizations();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    }
  };

  const getCoordinatorName = (idCoordinator) => {
    let coordinator = state.volunteer.volunteers.find(
      (volunteer) => volunteer.IdVolunteer == idCoordinator
    );
    return coordinator ? coordinator.FullName : "";
  };

  const handleClose = () => {
    setOpenOrganizationDialog(false);
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
        <Table id={tables.BENEFICIARY_ORGANIZATION_TABLE}>
          <TableHeader
            headCells={headCells}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={onSortChange}
          />
          <TableBody>
            {dataList.map((row) => {
              return (
                <TableRow
                  hover
                  key={row.Id}
                  tabIndex={-1}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>
                      {row.OrganizationName}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>
                      {getCoordinatorName(row.IDCoordinator)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "280px" }}>
                    <Typography color={"black"}>
                      {
                        variables.BENEFICIARY_TYPE.find(
                          (type) => type.value === row.OrganizationType
                        ).label
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>{row.Program}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "360px" }}>
                    <Typography color={"black"}>{row.Address}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "160px" }}>
                    <Typography color={"black"}>
                      {formatDateWithBackslash(row.ContractStartDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "160px" }}>
                    <Typography color={"black"}>
                      {formatDateWithBackslash(row.ContractEndDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "272px" }}>
                    <Typography color={"black"}>
                      {row.LegalRepresentative}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>{row.PhoneNumber}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "172px" }}>
                    <Typography color={"black"}>
                      {row.TotalPopulation}
                    </Typography>
                  </TableCell>

                  {isEditable && (
                    <TableCell>
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
              onUpdateClick={() => setOpenOrganizationDialog(true)}
              onDeleteClick={() => setOpenConfirmDialog(true)}
            />
            <BeneficiaryOrganizationDialog
              isUpdate
              open={openOrganizationDialog}
              setOpen={setOpenOrganizationDialog}
              existingOrganization={existingOrganization}
              onCancelClick={handleClose}
              getBeneficiaryOrganizations={getBeneficiaryOrganizations}
            />
            <ConfirmDialog
              title="Eliminar Organización Beneficiaria"
              open={openConfirmDialog}
              setOpen={setOpenConfirmDialog}
              onConfirm={deleteOrganization}
              successMessage={"Se ha eliminado correctamente!"}
              onClose={handleClose}
            >
              ¿Está seguro de que quiere eliminar este beneficiario?
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

BeneficiaryOrganizationTable.propTypes = {
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
  getBeneficiaryOrganizations: PropTypes.func,
};

export default BeneficiaryOrganizationTable;
