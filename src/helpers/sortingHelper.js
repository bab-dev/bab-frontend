const sortList = (array, param) => {
  return array.sort((a, b) => a[param].localeCompare(b[param]));
};

export { sortList };
