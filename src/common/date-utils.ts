export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const formatUTCDateString = (millis: number) => {
  const date = new Date(millis * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${DAYS[date.getUTCDay()]} ${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${hours < 12 ? 'am' : 'pm'}`;
};
