export const getStartOfMonthISO = () => {
  const currentDate = new Date();

  currentDate.setDate(1);
  currentDate.setHours(0, 0, 0, 0);

  return currentDate.toISOString();
};
