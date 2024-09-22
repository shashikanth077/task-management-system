export const isPastDate = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time part for an accurate comparison

  return selectedDate < today;
};
