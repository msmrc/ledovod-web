export const getDatesArray = (start, end) => {
  const arr = [];
  const dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

export const calculatePosition = (start, end, datesArray) => {
  const startPos = datesArray.findIndex(
    (date) => date.toDateString() === new Date(start).toDateString()
  );
  const endPos = datesArray.findIndex(
    (date) => date.toDateString() === new Date(end).toDateString()
  );
  const duration = endPos - startPos + 1;
  return { startPos, duration };
};
