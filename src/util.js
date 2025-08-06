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
  if (hours === 0) {
    return `${minutes}M`;
  }
  return `${hours}H ${minutes}M`;
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.date_from).isAfter(new Date())),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.date_from).isSameOrBefore(new Date()) && dayjs(point.date_to).isSameOrAfter(new Date())),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.date_to).isBefore(new Date())),
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const TypePoint = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

function sortByDay(pointA, pointB) {
  return dayjs(pointA.date_from).diff(dayjs(pointB.date_from));
}

function sortByPrice(pointA, pointB) {
  return pointB.base_price - pointA.base_price;
}

function sortByTime(pointA, pointB) {
  const durationA = dayjs(pointA.date_to).diff(dayjs(pointA.date_from), 'minute');
  const durationB = dayjs(pointB.date_to).diff(dayjs(pointB.date_from), 'minute');
  return durationB - durationA;
}

function humanizeDate(date, format = DATE_FORMAT) {
  return dayjs(date).format(format);
}

function updateItem (items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomPointArray, getDuration, humanizeDate, filter, updateItem, SortType, sortByDay, sortByPrice, sortByTime, TypePoint, UserAction, UpdateType, NoPointsTextType};
