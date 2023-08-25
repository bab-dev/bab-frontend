const variables = {
  SATURATION: 50,
  LIGHTNESS: 50,
  RANGE: 10,

  API_URL: "https://localhost:5001/api/",
  LOGIN_URL: "users/login",
  REFRESH_TOKEN_URL: "token/refresh",

  FACEBOOK_URL: "https://www.facebook.com/BancoDeAlimentos.Bo",
  INSTAGRAM_URL: "https://www.instagram.com/bancodealimentos.bo/",
  WEBSITE_URL: "https://bab.org.bo/",

  DEPARTMENT_URL: "departments",

  PERSON_VOLUNTEER_URL: "person-volunteers",
  PERSON_URL: "people",
  VOLUNTEER_URL: "volunteers",
  VOLUNTEER_BY_PERSON_URL: "volunteers/person",
  VOLUNTEER_AVAILABILITY_URL: "volunteers-availability",
  EMERGENCY_CONTACT_URL: "emergency-contacts",

  TRANSPORT_REQUEST_URL: "transport-requests",
  TRANSPORT_COORDINATOR_VIEW: "transport-coordinator",
  TRANSPORT__URL: "transport",
  COMPANY_URL: "companies",
  MARKET_URL: "markets",
  MARKET_SELLER_URL: "market-sellers",
  SUPPLIER_URL: "suppliers",
  PRODUCT_CATEGORY_URL: "product-categories",

  BENEFICIARIES_URL: "beneficiaries",
  BENEFICIARY_FAMILY_URL: "beneficiary-families",
  PERSON_BENEFICIARIES: "person-beneficiaries",
  BENEFICIARY_ORGANIZATION_URL: "beneficiary-organizations",

  TRIP_URL: "trips",

  ATTENDANCE_URL: "attendance",
  CLOCKING_URL: "clocking",
  CLOCKOUT_URL: "clockout",
  VOLUNTEER_WORK_STATISTICS_URL: "volunteer-work-statistics",

  CALENDAR_URL: "calendar",
  EVENT_URL: "events",
  EVENT_VOLUNTEER_URL: "event-volunteers",

  USER_PROFILE_URL: "user-profile",

  HOME_URL: "home",
  SIGN_IN: "sign-in",

  DEFAULT_FALLBACK_IMAGE_URL:
    "bab-bo-web-app/src/img/default-fallback-image.png",

  //User Roles
  USER_ROLES: {
    ADMIN: "ADMIN",
    USER: "USER",
  },

  //Sorting direction
  DESC: "desc",
  ASC: "asc",

  CITIES: [
    "Cochabamba",
    "Santa Cruz",
    "La Paz",
    "Tarija",
    "Sucre",
    "Potosi",
    "Oruro",
    "Beni",
    "Pando",
  ],
  WEEKDAYS: [
    {
      name: "Lunes",
      value: "Monday",
    },
    {
      name: "Martes",
      value: "Tuesday",
    },
    {
      name: "Miercoles",
      value: "Wednesday",
    },
    {
      name: "Jueves",
      value: "Thrusday",
    },
    {
      name: "Viernes",
      value: "Friday",
    },
    {
      name: "Sábado",
      value: "Saturday",
    },
    {
      name: "Domingo",
      value: "Sunday",
    },
  ],
  DAYTIMES: [
    {
      name: "Mañana",
      value: "Morning",
    },
    {
      name: "Tarde",
      value: "Evening",
    },
    {
      name: "Noche",
      value: "Night",
    },
  ],
  EMERGENCY_CONTACT_RELATIONSHIPS: [
    {
      label: "Madre",
      name: "Mother",
      value: 0,
    },
    {
      label: "Padre",
      name: "Father",
      value: 1,
    },
    {
      label: "Hermana",
      name: "Sister",
      value: 2,
    },
    {
      label: "Hermano",
      name: "Brother",
      value: 3,
    },
    {
      label: "Abuelo(a)",
      name: "Grandparent",
      value: 4,
    },
    {
      label: "Primo(a)",
      name: "Cousin",
      value: 5,
    },
    {
      label: "Esposo",
      name: "Husband",
      value: 6,
    },
    {
      label: "Esposa",
      name: "Wife",
      value: 7,
    },
    {
      label: "Hijo",
      name: "Son",
      value: 8,
    },
    {
      label: "Hija",
      name: "Daughter",
      value: 10,
    },
    {
      label: "Amigo(a)",
      name: "Friend",
      value: 11,
    },
    {
      label: "Otro",
      name: "Other",
      value: 12,
    },
  ],

  //BENEFICIARIES
  BENEFICIARY_TYPE: [
    {
      name: "GENERIC_BENEFICIARY",
      label: "Beneficiario Genérico",
      value: 0,
    },
    {
      name: "SHELTER",
      label: "Refugio",
      value: 1,
    },
    {
      name: "FOUNDATIONS",
      label: "Fundación",
      value: 2,
    },
    {
      name: "NURSING_HOME",
      label: "Asilo de Ancianos",
      value: 3,
    },
    {
      name: "WOMEN_SHELTER_CENTER",
      label: "Centro de Acogida de Mujeres",
      value: 4,
    },
    {
      name: "COMMUNITY_KITCHEN",
      label: "Comedores Populares",
      value: 5,
    },
    {
      name: "SHELTER_PER_DAY",
      label: "Centros Día",
      value: 6,
    },
    {
      name: "OTB",
      label: "OTB",
      value: 7,
    },
    {
      name: "OTHER",
      label: "Otro",
      value: 8,
    },
  ],

  //Months
  MONTHS: [
    {
      name: "January",
      label: "Enero",
      value: 1,
    },
    {
      name: "February",
      label: "Febrero",
      value: 2,
    },
    {
      name: "March",
      label: "Marzo",
      value: 3,
    },
    {
      name: "April",
      label: "Abril",
      value: 4,
    },
    {
      name: "May",
      label: "Mayo",
      value: 5,
    },
    {
      name: "June",
      label: "Junio",
      value: 6,
    },
    {
      name: "July",
      label: "Julio",
      value: 7,
    },
    {
      name: "August",
      label: "Agosto",
      value: 8,
    },
    {
      name: "September",
      label: "Septiembre",
      value: 9,
    },
    {
      name: "October",
      label: "Octubre",
      value: 10,
    },
    {
      name: "November",
      label: "Noviembre",
      value: 11,
    },
    {
      name: "December",
      label: "Diciembre",
      value: 12,
    },
  ],
};

export { variables };
