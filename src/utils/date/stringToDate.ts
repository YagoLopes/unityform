export const stringToDate = (
  _date: string,
  _format: string,
  _delimiter: string,
) => {
  const formatLowerCase = _format.toLowerCase();
  const formatItems = formatLowerCase.split(_delimiter);
  const dateItems = _date.split(_delimiter);
  const monthIndex = formatItems.indexOf('mm');
  const dayIndex = formatItems.indexOf('dd');
  const yearIndex = formatItems.indexOf('yyyy');
  let month = Number(dateItems[monthIndex]);
  month -= 1;
  const formatedDate = new Date(
    Number(dateItems[yearIndex]),
    Number(month),
    Number(dateItems[dayIndex]),
  );
  return formatedDate;
};
