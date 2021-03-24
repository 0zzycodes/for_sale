export const Nextweek = () => {
  const today = new Date();
  const nextWeek = today.getTime() + 7 * 24 * 60 * 60 * 1000;
  return nextWeek;
};

export const AddMonths = (date, months) => {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() !== d) {
    date.setDate(0);
  }
  return date.getTime() + 7 * 24 * 60 * 60 * 1000;
};
