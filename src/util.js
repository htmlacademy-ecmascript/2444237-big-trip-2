import dayjs from 'dayjs';
import { DATE_FORMAT, FilterType} from './const.js';

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
 [FilterType.EVERYTHING]: (tasks) => tasks,
 [FilterType.FUTURE]: (tasks) => tasks.filter((task) => humanizeDate(task.dateFrom) > humanizeDate(new Date())),
 [FilterType.PRESENT]: (tasks) => tasks.filter((task) => humanizeDate(task.dateFrom) === humanizeDate(new Date())), 
 [FilterType.PAST]: (tasks) => tasks.filter((task) => humanizeDate(task.dateFrom) < humanizeDate(new Date())),            
};

function humanizeDate(date, format = DATE_FORMAT) {
  return dayjs(date).format(format);
}

export { getRandomPointArray, getDuration, humanizeDate, filter };
