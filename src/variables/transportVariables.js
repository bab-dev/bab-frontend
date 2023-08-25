const headCellsCoordinatorView = [
  {
    id: "Date",
    numeric: false,
    label: "Fecha",
  },
  {
    id: "TransportType",
    numeric: false,
    label: "Tipo Transporte",
  },
  {
    id: "Place",
    numeric: false,
    label: "Lugar",
  },
  {
    id: "TimeRange",
    numeric: false,
    label: "Horario",
  },
  {
    id: "Priority",
    numeric: false,
    label: "Prioridad",
  },
  {
    id: "Status",
    numeric: false,
    label: "Estado",
  },
];

const headCellsEditableCoordinatorView = [
  {
    id: "Date",
    numeric: false,
    label: "Fecha",
  },
  {
    id: "TransportType",
    numeric: false,
    label: "Tipo Transporte",
  },
  {
    id: "Place",
    numeric: false,
    label: "Lugar",
  },
  {
    id: "TimeRange",
    numeric: false,
    label: "Horario",
  },
  {
    id: "Priority",
    numeric: false,
    label: "Prioridad",
  },
  {
    id: "Status",
    numeric: false,
    label: "Estado",
  },
  {
    id: "Modify",
    numeric: false,
    label: "Modificar",
  },
];

//Director View
const headCellsNewIncomingTransportRequest = [
  {
    id: "Date",
    numeric: false,
    label: "Fecha",
  },
  {
    id: "TransportType",
    numeric: false,
    label: "Tipo Transporte",
  },
  {
    id: "IDDepartment",
    numeric: false,
    label: "Departamento",
  },
  {
    id: "IDVolunteer",
    numeric: false,
    label: "Coordinador",
  },
  {
    id: "Place",
    numeric: false,
    label: "Lugar",
  },
  {
    id: "TimeRange",
    numeric: false,
    label: "Horario",
  },
  {
    id: "Priority",
    numeric: false,
    label: "Prioridad",
  },
  {
    id: "Action",
    numeric: false,
    label: "Acción",
  },
];
const headCellsDirectorView = [
  {
    id: "Date",
    numeric: false,
    label: "Fecha",
  },
  {
    id: "TransportType",
    numeric: false,
    label: "Tipo Transporte",
  },
  {
    id: "IDDepartment",
    numeric: false,
    label: "Departamento",
  },
  {
    id: "IDVolunteer",
    numeric: false,
    label: "Coordinador",
  },
  {
    id: "Place",
    numeric: false,
    label: "Lugar",
  },
  {
    id: "TimeRange",
    numeric: false,
    label: "Horario",
  },
  {
    id: "Priority",
    numeric: false,
    label: "Prioridad",
  },
  {
    id: "Status",
    numeric: false,
    label: "Estado",
  },
  {
    id: "Modify",
    numeric: false,
    label: "Modificar",
  },
];

const transportVariables = {
  TRANSPORT_TYPES: [
    {
      name: "All",
      label: "Todos",
      value: -1,
    },
    {
      name: "DELIVERY",
      label: "Entrega",
      value: 0,
    },
    {
      name: "PICK_UP",
      label: "Recojo",
      value: 1,
    },
  ],

  TRANSPORT_REQUEST_PRIORITY: [
    {
      name: "All",
      label: "Todos",
      value: -1,
    },
    {
      name: "LOW",
      label: "Baja",
      value: 0,
    },
    {
      name: "MEDIUM",
      label: "Media",
      value: 1,
    },
    {
      name: "HIGH",
      label: "Alta",
      value: 2,
    },
  ],

  TRANSPORT_REQUEST_STATUS: [
    {
      name: "All",
      label: "Todos",
      value: -1,
    },
    {
      name: "PENDING",
      label: "Pendiente",
      value: 0,
    },
    {
      name: "APPROVED",
      label: "Aprobado",
      value: 1,
    },
    {
      name: "REJECTED",
      label: "Rechazado",
      value: 2,
    },
  ],

  REQUEST_STATUS: {
    PENDING: {
      name: "PENDING",
      label: "Pendiente",
      value: 0,
    },
    APPROVED: {
      name: "APPROVED",
      label: "Aprobado",
      value: 1,
    },
    REJECTED: {
      name: "REJECTED",
      label: "Rechazado",
      value: 2,
    },
  },

  REQUEST_TRANSPORT_TYPE: {
    DELIVERY: {
      name: "DELIVERY",
      label: "Entrega",
      value: 0,
    },
    PICK_UP: {
      name: "PICK_UP",
      label: "Recojo",
      value: 1,
    },
  },
};

export {
  headCellsCoordinatorView,
  headCellsEditableCoordinatorView,
  headCellsNewIncomingTransportRequest,
  headCellsDirectorView,
  transportVariables,
};
