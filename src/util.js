import dayjs from 'dayjs';
import { DATE_FORMAT, FilterType} from './const.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function getRandomPointArray(pointArray) {
  return pointArray[Math.floor(Math.random() * pointArray.length)];
}

function getDuration(dateFrom, dateTo) {
  const totalMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = Math.floor(totalMinutes / (HOURS_IN_DAY * MINUTES_IN_HOUR));
  const hours = Math.floor((totalMinutes % (HOURS_IN_DAY * MINUTES_IN_HOUR)) / MINUTES_IN_HOUR);
  const minutes = totalMinutes % MINUTES_IN_HOUR;

  if (totalMinutes < MINUTES_IN_HOUR) {
    return `${totalMinutes}M`;
  } else if (days === 0) {
    const hoursString = hours.toString().padStart(2, '0');
    if(minutes === 0) {
      return `${hoursString}H 00M`;
    }
    const minutesString = minutes.toString().padStart(2, '0');
    return `${hoursString}H ${minutesString}M`;
  } else {
    const daysString = days < 10 ? days.toString().padStart(2, '0') : `${days}`;
    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    return `${daysString}D ${hoursString}H ${minutesString}M`;
  }
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
  fetchError: 'Failed to load latest route information'
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
  return date ? dayjs(date).format(format) : '';
}


export { getRandomPointArray, getDuration, humanizeDate, filter, SortType, sortByDay, sortByPrice, sortByTime, TypePoint, UserAction, UpdateType, NoPointsTextType};
