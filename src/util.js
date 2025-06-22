import dayjs from 'dayjs';
import { DATE_FORMAT, FilterType} from './const.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function getRandomPointArray(pointArray) {
  return pointArray[Math.floor(Math.random() * pointArray.length)];
}

function getDuration(dateFrom, dateTo) {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  return `${hours}H ${minutes}M`;
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom).isAfter(new Date())),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrBefore(new Date()) && dayjs(point.dateTo).isSameOrAfter(new Date())),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateTo).isBefore(new Date())),
};

function humanizeDate(date, format = DATE_FORMAT) {
  return dayjs(date).format(format);
}

function updateItem (items, update) {
  return items.map((item) => item.id === update.id ? update : item)
}
export { getRandomPointArray, getDuration, humanizeDate, filter, updateItem };
