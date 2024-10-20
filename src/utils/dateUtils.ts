export const formatDate = (date: Date | string | number): string => {
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    return 'Invalid Date';
  }
  return validDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: Date | string | number): string => {
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    return 'Invalid Time';
  }
  return validDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
