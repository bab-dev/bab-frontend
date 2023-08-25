import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
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
import { tables } from "variables/tableVariables";
import { housingTypes } from "variables/beneficiariesFamiliesVariables";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";

import PersonBeneficiaryFamilyDialog from "components/dialogs/PersonBeneficiaryFamilyDialog";
import ConfirmDialog from "components/dialogs/ConfirmDialog";
import ModifyMenu from "components/menus/ModifyMenu";
import { stringAvatar } from "helpers/avatarHelper";
import { formatDateWithBackslash } from "helpers/dateHelper";

const PersonBeneficiaryFamilyTable = ({
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
  getBeneficiaryFamilies,
}) => {
  const isNotFound = !dataList.length;
  const axiosPrivate = useAxiosPrivate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openBeneficiaryDialog, setOpenBeneficiaryDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState("");
  const [existingBeneficiary, setExistingBeneficiary] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const setFullName = (name, lastName) => {
    return `${name.split(" ")[0]} ${lastName.split(" ")[0]}`;
  };

  const handleOpenMenu = (event, idBeneficiary) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
    setSelectedBeneficiaryId(idBeneficiary);
  };

  useEffect(() => {
    const getSelectedBeneficiary = async () => {
      if (selectedBeneficiaryId != "") {
        try {
          const response = await axiosPrivate.get(
            `${variables.PERSON_BENEFICIARIES}/${selectedBeneficiaryId}`
          );
          setExistingBeneficiary(response.data);
        } catch (error) {
          console.error(`Error fetching transport request: ${error}`);
        }
      }
    };
    getSelectedBeneficiary();
  }, [selectedBeneficiaryId]);

  const deleteBeneficiary = async () => {
    if (existingBeneficiary) {
      await axiosPrivate
        .delete(
          `${variables.PERSON_BENEFICIARIES}/${existingBeneficiary.BeneficiaryFamily.Id}`
        )
        .then(() => {
          setOpenMenu(false);
          getBeneficiaryFamilies();
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
    setOpenBeneficiaryDialog(false);
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
        <Table id={tables.PERSON_BENEFICIARY_FAMILY_TABLE}>
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
                  <TableCell align="center">
                    <Avatar
                      sx={{ width: 56, height: 56 }}
                      alt={setFullName(row.FirstName, row.FirstSurname)}
                      {...stringAvatar(
                        setFullName(row.FirstName, row.FirstSurname),
                        false
                      )}
                    />
                  </TableCell>

                  <TableCell align="left" sx={{ minWidth: "216px" }}>
                    <Typography color={"black"}>
                      {row.FirstSurname} {row.SecondSurname}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "200px" }}>
                    <Typography color={"black"}>{row.FirstName}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>{row.CI}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "120px" }}>
                    <Typography color={"black"}>
                      {formatDateWithBackslash(row.DateOfBirth)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>{row.Age}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "400px" }}>
                    <Typography color={"black"}>{row.Address}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color={"black"}>{row.PhoneNumber}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "220px" }}>
                    <Typography color={"black"}>
                      {
                        housingTypes.find(
                          (type) => type.value === row.HousingType
                        ).label
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.TotalPopulation}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.MemberAgesBetween0And2Years}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.MemberAgesBetween3And5Years}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.MemberAgesBetween6And18Years}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "85px" }}>
                    <Typography color={"black"}>
                      {row.MemberAgesBetween19And49Years}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color={"black"}>
                      {row.MemberAgesOver50Years}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      textOrientation: "mixed",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minWidth: "160px",
                    }}
                  >
                    <Typography color={"black"}>
                      {row.TotalMembersWithDisabilities}
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
              onUpdateClick={() => setOpenBeneficiaryDialog(true)}
              onDeleteClick={() => setOpenConfirmDialog(true)}
            />
            <PersonBeneficiaryFamilyDialog
              isUpdate
              open={openBeneficiaryDialog}
              setOpen={setOpenBeneficiaryDialog}
              existingBeneficiary={existingBeneficiary}
              onClose={handleClose}
              getBeneficiaryFamilies={getBeneficiaryFamilies}
            />
            <ConfirmDialog
              title="Eliminar Beneficiario"
              open={openConfirmDialog}
              setOpen={setOpenConfirmDialog}
              onConfirm={deleteBeneficiary}
              successMessage={"Se ha eliminado correctamente!"}
              onClose={handleClose}
            >
              ¿Está seguro de que quiere eliminar este beneficiario?
            </ConfirmDialog>
          </TableBody>
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

PersonBeneficiaryFamilyTable.propTypes = {
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
  getBeneficiaryFamilies: PropTypes.func,
};

export default PersonBeneficiaryFamilyTable;
