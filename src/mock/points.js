import { getRandomPointArray } from '../util';
import { nanoid } from 'nanoid';
const pointsMock = [
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    'base_price': 1300,
    'date_from': '2019-05-10T14:20:54.845Z',
    'date_to': '2019-05-10T14:55:54.845Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    'is_favorite': false,
    'offers': [
      'taxi1',
      'taxi3',
    ],
    'type': 'taxi'
  },

  {
    'id': 'f4b62099-293f-4c3d-a702-94eec1a2808c',
    'base_price': 600,
    'date_from': '2019-07-10T13:00:56.845Z',
    'date_to': '2019-07-10T13:22:50.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    'is_favorite': false,
    'offers': [
      'bus3',
      'bus2'
    ],
    'type': 'bus'
  },

  {
    'id': 'f4b62099-293f-4c3d-a702-94eec2a2808c',
    'base_price': 800,
    'date_from': '2019-07-20T19:25:56.845Z',
    'date_to': '2019-07-20T19:55:25.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e02',
    'is_favorite': false,
    'offers': [],
    'type': 'ship'
  },

  {
    'id': 'f4b62099-293f-4c3d-a702-94eec3a2808c',
    'base_price': 900,
    'date_from': '2019-08-07T20:20:56.845Z',
    'date_to': '2019-08-07T20:40:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    'is_favorite': false,
    'offers': [
      'train1'
    ],
    'type': 'train'
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomPointArray(pointsMock)
  };
}

export { pointsMock, getRandomPoint };
