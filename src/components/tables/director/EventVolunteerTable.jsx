import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  AvatarGroup,
  Box,
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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import TableHeader from "../TableHeader";
import TablePaginator from "../TablePaginator";

import { variables } from "variables";

import { getAvatarByEventType, stringAvatar } from "helpers/avatarHelper";
import { formatDateTimeWithBackslash } from "helpers/dateHelper";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { tables } from "variables/tableVariables";
import AllEventParticipantsDialog from "components/dialogs/AllEventParticipantsDialog";

const EventVolunteerTable = ({
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
}) => {
  const axiosPrivate = useAxiosPrivate();
  const isNotFound = !dataList.length || dataList.length == 0;
  const [volunteersAssignedToEvent, setVolunteersAssignedToEvent] = useState(
    []
  );
  const [openShowAllParticipantsDialog, setOpenShowAllParticipantsDialog] =
    useState(false);
  const [allEventParticipants, setAllEventParticipants] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const eventIds = dataList.map((row) => row.Id);
        const volunteers = await getVolunteersByIdEvent(eventIds);

        const volunteersByIdEvent = eventIds.map((idEvent) =>
          volunteers.filter((volunteer) => volunteer.IDEvent === idEvent)
        );

        setVolunteersAssignedToEvent(volunteersByIdEvent);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, [dataList]);

  const getVolunteersByIdEvent = async (eventIds) => {
    const volunteers = [];
    for (const id of eventIds) {
      try {
        const response = await axiosPrivate.get(
          `${variables.EVENT_VOLUNTEER_URL}/${variables.EVENT_URL}/${id}/${variables.VOLUNTEER_URL}`
        );
        if (response.data.length > 0) {
          volunteers.push(...response.data);
        }
      } catch (err) {
        if (err.response) {
          const { status } = err.response;
          throw Error(`HTTP error: ${status}`);
        }
      }
    }
    return volunteers;
  };

  const handleShowAllParticipants = (participants) => {
    setOpenShowAllParticipantsDialog(true);
    setAllEventParticipants(participants);
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
        <Table id={tables.EVENT_VOLUNTEER_TABLE}>
          <TableHeader
            headCells={headCells}
            orderByColumn={orderByColumn}
            orderDirection={orderDirection}
            onSortChange={onSortChange}
          />
          <TableBody>
            {dataList.map((row, index) => {
              const volunteersForEvent = volunteersAssignedToEvent[index] || [];
              return (
                <TableRow key={row.Id} tabIndex={-1}>
                  <TableCell>
                    <Box
                      display="flex"
                      width={"100%"}
                      justifyContent={"center"}
                    >
                      {getAvatarByEventType(row.EventTypeValue)}
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "400px" }}>
                    <Typography color={"black"}>{row.Title}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "160px" }}>
                    <Typography color={"black"}>
                      {row.DepartmentName}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "200px" }}>
                    <Typography color={"black"}>
                      {formatDateTimeWithBackslash(row.StartDateTime)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "200px" }}>
                    <Typography color={"black"}>
                      {formatDateTimeWithBackslash(row.EndDateTime)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "192px" }}>
                    {volunteersForEvent.length > 0 && (
                      <Grid
                        container
                        width={"100%"}
                        display={"flex"}
                        wrap="nowrap"
                        justifyContent={"space-between"}
                      >
                        <AvatarGroup max={4} sx={{ justifyContent: "left" }}>
                          {volunteersForEvent.map((volunteer) => {
                            return (
                              <Avatar
                                key={volunteer.IDVolunteer}
                                sx={{ width: 56, height: 56 }}
                                alt={volunteer.FullName}
                                {...stringAvatar(volunteer.FullName, false)}
                              />
                            );
                          })}
                        </AvatarGroup>
                        <IconButton
                          aria-label="showMore"
                          onClick={() =>
                            handleShowAllParticipants(volunteersForEvent)
                          }
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      </Grid>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
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
      />{" "}
      <AllEventParticipantsDialog
        open={openShowAllParticipantsDialog}
        setOpen={setOpenShowAllParticipantsDialog}
        participants={allEventParticipants}
      />
    </Paper>
  );
};

EventVolunteerTable.propTypes = {
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
};

export default EventVolunteerTable;
