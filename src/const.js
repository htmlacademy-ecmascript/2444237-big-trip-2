const POINT_COUNT = 3;
const DATE_FORMAT = 'MMMM D';
const TIME_FORMAT = 'HH:mm';
const FORM_EDIT_DATE = 'DD/MM/YY HH:mm';

const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const API_PATH = 'points';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

export { POINT_COUNT, DATE_FORMAT, TIME_FORMAT, FORM_EDIT_DATE, FilterType, SortType, AUTHORIZATION, END_POINT, API_PATH };
