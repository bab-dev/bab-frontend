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

import DepartmentDialog from "components/dialogs/DepartmentDialog";
import ModifyMenu from "components/menus/ModifyMenu";

const DepartmentTable = ({
  isEditable,
  headCells,
  dataList,
  getDepartments,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length;
  const [openMenu, setOpenMenu] = useState(false);
  const [openDepartmentDialog, setOpenDepartmentDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [existingDepartment, setExistingDepartment] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event, idDepartment) => {
    setAnchorEl(event.currentTarget);
    setSelectedDepartmentId(idDepartment);
    setOpenMenu(true);
  };

  useEffect(() => {
    const getSelectedDepartment = async () => {
      if (selectedDepartmentId != "") {
        try {
          const response = await axiosPrivate.get(
            `${variables.DEPARTMENT_URL}/${selectedDepartmentId}`
          );
          setExistingDepartment(response.data);
        } catch (error) {
          console.error(`Error fetching departments: ${error}`);
        }
      }
    };
    getSelectedDepartment();
  }, [selectedDepartmentId]);

  const deleteDepartment = async () => {
    if (existingDepartment) {
      await axiosPrivate
        .delete(`${variables.DEPARTMENT_URL}/${existingDepartment.Id}`)
        .then(() => {
          getDepartments();
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
    setOpenDepartmentDialog(false);
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
                  <TableCell align="left" sx={{ minWidth: "80px" }}>
                    <Typography color={"black"}>
                      {row.DepartmentName}
                    </Typography>
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
              onUpdateClick={() => setOpenDepartmentDialog(true)}
              onDeleteClick={() => setOpenConfirmDialog(true)}
            />
            <DepartmentDialog
              isUpdate
              open={openDepartmentDialog}
              setOpen={setOpenDepartmentDialog}
              existingDepartment={existingDepartment}
              onCancelClick={handleClose}
              getDepartments={getDepartments}
            />
            <ConfirmDialog
              title="Eliminar Departamento"
              open={openConfirmDialog}
              setOpen={setOpenConfirmDialog}
              onConfirm={deleteDepartment}
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

DepartmentTable.propTypes = {
  isEditable: PropTypes.bool,
  headCells: PropTypes.array,
  dataList: PropTypes.array,
  getDepartments: PropTypes.func,
};

export default DepartmentTable;
