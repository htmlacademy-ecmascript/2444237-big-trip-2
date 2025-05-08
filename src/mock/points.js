import { getRandomPointArray } from '../util';

const pointsMock = [
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    'base_price': 1100,
    'date_from': '2019-05-10T22:55:56.845Z',
    'date_to': '2019-05-15T11:22:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    'is_favorite': false,
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    'type': 'taxi'
  },

  {
    'id': 'f4b62099-293f-4c3d-a702-94eec1a2808c',
    'base_price': 600,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-13T11:22:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    'is_favorite': false,
    'offers': [
      'b4c3e4e6-9053-42ce-c747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    'type': 'bus'
  },

  {
    'id': 'f4b62099-293f-4c3d-a702-94eec2a2808c',
    'base_price': 800,
    'date_from': '2019-07-20T22:55:56.845Z',
    'date_to': '2019-07-25T11:22:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e02',
    'is_favorite': false,
    'offers': [
    ],
    'type': 'ship'
  },

  {
    'id': 'f4b62099-293f-4c3d-a702-94eec3a2808c',
    'base_price': 900,
    'date_from': '2019-08-01T22:55:56.845Z',
    'date_to': '2019-08-07T11:22:13.375Z',
    'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    'is_favorite': false,
    'offers': [
      'b4c3e4e6-9053-42ce-c747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e456-9053-41ce-b747-e281314baa31'
    ],
    'type': 'train'
  }
];

function getRandomPoint() {
  return getRandomPointArray(pointsMock);
}

export { pointsMock, getRandomPoint };
