export const getStartOfMonth = () => {
  const currentDate = new Date();

  currentDate.setDate(1);
  currentDate.setHours(0, 0, 0, 0);

  const firstDayOfMonthISO = currentDate.toISOString();

  return firstDayOfMonthISO;
};
