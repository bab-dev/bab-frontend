const headCellsDirectorView = [
  { id: "Avatar", numeric: false, label: "" },
  { id: "Title", numeric: false, label: "Actividad" },
  { id: "IDDepartment", numeric: false, label: "Departmento" },
  { id: "Start", numeric: false, label: "Desde" },
  { id: "End", numeric: false, label: "Hasta" },
  { id: "Participants", numeric: false, label: "Participantes" },
];

const eventVariables = {
  //EVENTS
  EVENT_TYPE: [
    {
      name: "DELIVERY",
      label: "Entrega de Donaciones",
      value: 0,
    },
    {
      name: "PICK_UP",
      label: "Recojo de Donaciones",
      value: 1,
    },
    {
      name: "FOOD_SELECTION",
      label: "Selección de Alimento",
      value: 2,
    },
    {
      name: "DISTRIBUTION_TO_FAMILIES",
      label: "Distribución de Canastas",
      value: 3,
    },
    {
      name: "CLEANING",
      label: "Limpieza",
      value: 4,
    },
    {
      name: "MEETING",
      label: "Reunión",
      value: 5,
    },
    {
      name: "OTHER",
      label: "Otro",
      value: 6,
    },
  ],
};

export { headCellsDirectorView, eventVariables };
