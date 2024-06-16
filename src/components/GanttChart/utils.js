export const getDatesArray = (start, end) => {
  const arr = [];
  const dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 14);
  }
  return arr;
};

export const calculatePosition = (start, end, datesArray) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Найти ближайшую точку начала
  const startPos = datesArray.findIndex(date => date.getTime() === startDate.getTime());

  // Найти ближайшую точку конца
  const endPos = datesArray.findIndex(date => date.getTime() === endDate.getTime());

  // Если конечная точка не найдена, берем следующую ближайшую дату
  const correctedEndPos = endPos === -1 ? datesArray.findIndex(date => date > endDate) : endPos;

  // Если дата старта не найдена, значит она раньше первой даты в массиве
  const correctedStartPos = startPos === -1 ? 0 : startPos;

  // Корректировка продолжительности
  const duration = correctedEndPos - correctedStartPos + 1;

  console.log(`start: ${startDate}, end: ${endDate}, startPos: ${correctedStartPos}, endPos: ${correctedEndPos}, duration: ${duration}`);

  return { startPos: correctedStartPos, duration };
};

