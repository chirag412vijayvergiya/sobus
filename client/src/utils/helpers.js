import { format, formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yy');
};
export const capitalizeFirstLetter = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
