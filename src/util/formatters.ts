export const formatDate = (dateToFormat: string) => {
  const rawDate = new Date(dateToFormat);
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthsOfYear[rawDate.getMonth()]} ${String(
    rawDate.getDate()
  ).padStart(2, "0")}, ${rawDate.getFullYear()}`;
};

export const formatDID = (didToFormat: string) => {
  return `${didToFormat.substring(0, 24)}...${didToFormat.substring(
    didToFormat.length - 4
  )}`;
};
