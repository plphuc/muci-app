// 0 = desc, 1=asc
const sortListWord = (list, sortKey, sortDirection = 0) => {
  return list.slice().sort((a, b) => {
    const upperCaseA = a[sortKey].toUpperCase();
    const upperCaseB = b[sortKey].toUpperCase();
    if (upperCaseA > upperCaseB) {
      return sortDirection === 0 ? 1 : -1;
    }
    if (upperCaseA < upperCaseB) {
      return sortDirection === 0 ? -1 : 1;
    }
    return 0;
  })
};

export default sortListWord