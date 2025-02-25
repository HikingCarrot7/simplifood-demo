export const formatDateAndTime = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }
  // Spanish names for months
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Format date as DD / Month / YYYY
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const formattedDate = `${day} / ${month} / ${year}`;

  // Format date in 12h with AM/PM
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours || 12;

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return {
    date: formattedDate,
    time: formattedTime,
  };
};
