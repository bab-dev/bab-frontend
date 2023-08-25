import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import esLocale from "@fullcalendar/core/locales/es";

import { Box } from "@mui/material";
import EventDialog from "./dialogs/EventDialog";
import AssignEventDialog from "./dialogs/AssignEventDialog";
import { variables } from "variables";

const Calendar = ({
  isDirector,
  events,
  getAllEvents,
  getEventsByIdVolunteer,
}) => {
  const state = useSelector((state) => state);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAssignEventDialog, setOpenAssignEventDialog] = useState(false);
  const [creationArg, setCreationArg] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateSelect = (arg) => {
    if (state.user.userRole == variables.USER_ROLES.ADMIN) {
      setOpenCreateDialog(true);
    }
    setCreationArg(arg);
  };

  const handleEventClick = async (arg) => {
    if (arg) {
      setSelectedEvent(arg.event._def.extendedProps);
      if (isDirector) {
        setOpenUpdateDialog(true);
      } else {
        setOpenAssignEventDialog(true);
      }
    }
  };

  const handleUpdateDialogClose = () => {
    setSelectedEvent(null);
    setOpenUpdateDialog(false);
  };

  return (
    <Box width={"100%"}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        editable={true}
        locale={esLocale}
        titleFormat={{ year: "numeric", month: "long", day: "2-digit" }}

        //validRange={{ start: getActualDate() }}
      />
      {openCreateDialog && (
        <EventDialog
          isCreate
          creationArg={creationArg}
          open={openCreateDialog}
          setOpen={setOpenCreateDialog}
          onCancelClick={() => setOpenCreateDialog(false)}
          getAllEvents={getAllEvents}
        />
      )}

      {openUpdateDialog && (
        <EventDialog
          isUpdate
          open={openUpdateDialog}
          setOpen={setOpenUpdateDialog}
          selectedEvent={selectedEvent}
          onCancelClick={handleUpdateDialogClose}
          getAllEvents={getAllEvents}
        />
      )}
      {openAssignEventDialog && (
        <AssignEventDialog
          open={openAssignEventDialog}
          setOpen={setOpenAssignEventDialog}
          selectedEvent={selectedEvent}
          getAllEvents={getAllEvents}
          getEventsByIdVolunteer={getEventsByIdVolunteer}
        />
      )}
    </Box>
  );
};

Calendar.propTypes = {
  isDirector: PropTypes.bool,
  events: PropTypes.array,
  getAllEvents: PropTypes.func,
  getEventsByIdVolunteer: PropTypes.func,
};
export default Calendar;
