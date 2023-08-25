const headCells = [
  {
    id: "AvatarImage",
    numeric: false,
    label: "",
  },
  {
    id: "LastName",
    numeric: false,
    label: "Apellido",
  },
  {
    id: "FirstName",
    numeric: false,
    label: "Nombre",
  },
  {
    id: "CI",
    numeric: false,
    label: "CI",
  },
  {
    id: "DateOfBirth",
    numeric: false,
    label: "Fecha de Nacimiento",
  },
  {
    id: "Age",
    numeric: false,
    label: "Edad",
  },
  {
    id: "Address",
    numeric: false,
    label: "Dirección",
  },
  {
    id: "PhoneNumber",
    numeric: false,
    label: "Celular",
  },
  {
    id: "HousingTypeName",
    numeric: false,
    label: "Tipo de Vivienda",
  },
  {
    id: "TotalPopulation",
    numeric: false,
    label: "Población Total",
  },
  {
    id: "MemberAgesBetween0And2Years",
    numeric: false,
    label: "0-2 años",
  },

  {
    id: "MemberAgesBetween3And5Years",
    numeric: false,
    label: "3-5 años",
  },

  {
    id: "MemberAgesBetween6And18Years",
    numeric: false,
    label: "6-18 años",
  },

  {
    id: "MemberAgesBetween19And49Years",
    numeric: false,
    label: "19 - 49 años",
  },

  {
    id: "MemberAgesOver50Years",
    numeric: false,
    label: "> 50 años",
  },
  {
    id: "TotalMembersWithDisabilities",
    numeric: false,
    label: "Población con Discapacidad",
  },
  {
    id: "Modify",
    numeric: false,
    label: "Modificar",
  },
];

const housingTypes = [
  {
    name: "OWN",
    label: "Propia",
    value: 0,
  },
  {
    name: "RENT",
    label: "Alquiler",
    value: 1,
  },
  {
    name: "FAMILY_HOUSE",
    label: "Vivienda de Familiares",
    value: 2,
  },
  {
    name: "OTHER",
    label: "Otro",
    value: 3,
  },
];

const steps = [
  "Datos Personales",
  "Información Adicional",
  "Miembros del Hogar",
];

export { headCells, housingTypes, steps };
