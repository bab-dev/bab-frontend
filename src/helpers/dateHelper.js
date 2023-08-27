const getActualDate = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  let dateString = `${year}-${month}-${day}`;
  return dateString;
};

const getActualTime = () => {
  let today = new Date();
  let hour;
  if (today.getHours() < 10) hour = "0" + today.getHours();
  else hour = today.getHours();

  let minutes;
  if (today.getMinutes() < 10) minutes = "0" + today.getMinutes();
  else minutes = today.getMinutes();

  return hour + ":" + minutes;
};

const parseDate = (date) => {
  let parsedDate = new Date(date);

  let year = parsedDate.getFullYear();
  let month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  let day = String(parsedDate.getDate()).padStart(2, "0");

  let dateString = `${year}-${month}-${day}`;
  return dateString;
};

const getActualDateTime = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");

  let dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return dateString;
};

const parseDateTime = (date) => {
  let parsedDate = new Date(date);

  let year = parsedDate.getFullYear();
  let month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  let day = String(parsedDate.getDate()).padStart(2, "0");

  let hours = String(parsedDate.getHours()).padStart(2, "0");
  let minutes = String(parsedDate.getMinutes()).padStart(2, "0");
  let seconds = String(parsedDate.getSeconds()).padStart(2, "0");

  let dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return dateString;
};

//FORMAT WITH /
const formatDateWithBackslash = (dateString) => {
  let date = dateString.split("T")[0];

  let year = date.split("-")[0];
  let month = date.split("-")[1];
  let day = date.split("-")[2];

  return `${day}/${month}/${year}`;
};

const formatDateTime = (dateString) => {
  let date = dateString.split("T")[0];
  let time = dateString.split("T")[1].slice(0, 5);

  return `${date} ${time}`;
};

const formatDateTimeWithBackslash = (dateString) => {
  let date = dateString.split("T")[0];
  let time = dateString.split("T")[1].slice(0, 5);

  let year = date.split("-")[0];
  let month = date.split("-")[1];
  let day = date.split("-")[2];

  return `${day}/${month}/${year} ${time}`;
};

const parseDateToTextString = (date) => {
  return new Date(date);
};

const generateArrayOfYears = () => {
  let maxYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => maxYear - i);
};

export {
  parseDate,
  getActualDate,
  getActualTime,
  getActualDateTime,
  parseDateTime,
  parseDateToTextString,
  formatDateWithBackslash,
  formatDateTime,
  formatDateTimeWithBackslash,
  generateArrayOfYears,
};
