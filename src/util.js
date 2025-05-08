import dayjs from 'dayjs';
import { DATE_FORMAT } from './const.js';

function getRandomPointArray(pointArray) {
  return pointArray[Math.floor(Math.random() * pointArray.length)];
}
function getDuration(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom), 'days');
}

function humanizeDate(date) {
  return dayjs(date).format(DATE_FORMAT);
}
export { getRandomPointArray, getDuration, humanizeDate };
