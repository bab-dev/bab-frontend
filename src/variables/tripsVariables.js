const tripVariables = {
  PLACE_TYPE: [
    {
      name: "Company",
      value: 0,
      label: "Empresa",
    },
    {
      name: "Market",
      value: 1,
      label: "Mercado",
    },
    {
      name: "Organization",
      value: 2,
      label: "Organizacion Benéfica",
    },
    {
      name: "FoodBank",
      value: 3,
      label: "Almacén",
    },
    {
      name: "HidroponicPlant",
      value: 4,
      label: "Planta de Hidroponía",
    },
  ],
};

const headCells = [
  {
    id: "IDCoordinator",
    numeric: false,
    label: "Coordinador BAB",
  },
  {
    id: "IDDepartment",
    numeric: false,
    label: "Departmento",
  },
  {
    id: "Vehicule",
    numeric: false,
    label: "Vehículo",
  },
  {
    id: "Date",
    numeric: false,
    label: "Fecha",
  },
  {
    id: "NumOfPassengers",
    numeric: false,
    label: "#Pasajeros",
  },
  {
    id: "TransportTypeName",
    numeric: false,
    label: "Tipo de Transporte",
  },
  {
    id: "DepartureTypeName",
    numeric: false,
    label: "Tipo de Punto de Partida",
  },
  {
    id: "DeparturePlace",
    numeric: false,
    label: "Punto Partida",
  },
  {
    id: "DepartureTime",
    numeric: false,
    label: "Hora Partida",
  },
  {
    id: "InitialKm",
    numeric: true,
    label: "Km. Inicial",
  },
  {
    id: "ArrivalTypeName",
    numeric: false,
    label: "Tipo de Punto de Llegada",
  },
  {
    id: "ArrivalPlace",
    numeric: false,
    label: "Punto Llegada",
  },
  {
    id: "ArrivalTime",
    numeric: false,
    label: "Hora Llegada",
  },
  {
    id: "FinalKm",
    numeric: true,
    label: "Km. Final",
  },
  {
    id: "TotalKm",
    numeric: true,
    label: "Km. Total",
  },
  {
    id: "TotalTime",
    numeric: false,
    label: "Tiempo Total",
  },
  {
    id: "Modify",
    numeric: false,
    label: "Modificar",
  },
];

export { tripVariables, headCells };
