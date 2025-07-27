import { getRandomPointArray } from '../util';
import { nanoid } from 'nanoid';
const pointsMock = [
  {
    'id': 'd5de9047-b24c-444f-aec4-1c1091b6f041',
    'base_price': 186,
    'date_from': '2025-07-18T04:52:16.675Z',
    'date_to': '2025-07-19T08:13:16.675Z',
    'destination': 'd0764400-e27c-441e-ac2c-e5d0b75d9e7b',
    'is_favorite': true,
    'offers': [
      '4ce962f9-4b20-41c8-a72c-642ef9264898',
      '4dcd14e7-059f-4fe3-acab-1c1b3563afdf',
      '22db94a5-9e1c-4607-b2a5-56466d102d54',
      '6e611472-9407-4e26-ac13-853c6e258da4'
    ],
    'type': 'flight'
  },
  {
    'id': 'c43787c7-924d-4c75-932c-d089a434534b',
    'base_price': 308,
    'date_from': '2025-07-19T21:38:16.675Z',
    'date_to': '2025-07-21T09:36:16.675Z',
    'destination': '70a96e21-363d-4a4a-921b-2de42b545f4b',
    'is_favorite': true,
    'offers': [
      '2e78563f-4e6a-45ff-bac6-eb6bc1545e4e'
    ],
    'type': 'bus'
  },
  {
    'id': '9adb24de-ff7c-4b74-84a9-17f9938fc644',
    'base_price': 2960,
    'date_from': '2025-07-23T07:16:16.675Z',
    'date_to': '2025-07-23T13:19:16.675Z',
    'destination': 'fb337991-8d0f-4b77-9755-f1116ef3be19',
    'is_favorite': false,
    'offers': [
      'c6a275b0-f0b6-4cc2-a46e-86f5f123d1a0'
    ],
    'type': 'drive'
  },
  {
    'id': '794594db-1e30-413c-afa0-df073cdc5728',
    'base_price': 2026,
    'date_from': '2025-07-25T10:11:16.675Z',
    'date_to': '2025-07-25T18:15:16.675Z',
    'destination': 'b9c08613-b879-4252-bdeb-a5a4e8606cd0',
    'is_favorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '3f47c05d-7d16-406b-bf60-ff5249b4658d',
    'base_price': 2250,
    'date_from': '2025-07-27T06:18:16.675Z',
    'date_to': '2025-07-29T03:36:16.675Z',
    'destination': '70a96e21-363d-4a4a-921b-2de42b545f4b',
    'is_favorite': false,
    'offers': [
      'bd10b38d-2e17-4a14-83d6-d27f30f52dad'
    ],
    'type': 'ship'
  },
  {
    'id': '3263eb0c-7dae-4529-a130-f7f278dab027',
    'base_price': 6811,
    'date_from': '2025-07-30T08:23:16.675Z',
    'date_to': '2025-07-31T10:39:16.675Z',
    'destination': '31e9a30d-761e-41ae-abfe-1c37fc9a62c4',
    'is_favorite': true,
    'offers': [
      '4dcd14e7-059f-4fe3-acab-1c1b3563afdf',
      '22db94a5-9e1c-4607-b2a5-56466d102d54',
      '6e611472-9407-4e26-ac13-853c6e258da4'
    ],
    'type': 'flight'
  },
  {
    'id': '90613db5-3f10-48d5-b5be-1482d86b140d',
    'base_price': 290,
    'date_from': '2025-08-02T02:52:16.675Z',
    'date_to': '2025-08-02T10:10:16.675Z',
    'destination': '70a96e21-363d-4a4a-921b-2de42b545f4b',
    'is_favorite': true,
    'offers': [
      '7c1177c8-9a99-4e63-b165-11c930779d82',
      'd5aa38b1-1816-4718-b8e9-e0cf8b117d2a'
    ],
    'type': 'restaurant'
  },
  {
    'id': '4a0db074-28eb-42cf-9205-c181f7d46e6c',
    'base_price': 8391,
    'date_from': '2025-08-03T09:15:16.675Z',
    'date_to': '2025-08-04T21:44:16.675Z',
    'destination': '2659e51a-09ce-488a-8b16-4f18fd005d6c',
    'is_favorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '23b9da03-020b-4f6a-91d1-bbf1517f4b0b',
    'base_price': 8277,
    'date_from': '2025-08-06T12:17:16.675Z',
    'date_to': '2025-08-07T21:01:16.675Z',
    'destination': 'd70ae645-ab35-40b5-9fd0-ede8be6423e2',
    'is_favorite': false,
    'offers': [
      '2c6aeb24-3d4d-446d-82fe-d86596cb2e29',
      'd8beaffc-462b-4ebc-a146-a30de8ab2a63',
      'd05d4f08-f65f-46f6-a8c1-5311451ae591',
      'a0e420d7-45e4-4f33-8dbd-4a78e5be9b27',
      '51fe7693-9744-442b-bb80-27736ef2458a',
      'bd10b38d-2e17-4a14-83d6-d27f30f52dad'
    ],
    'type': 'ship'
  },
  {
    'id': '3a69cf5e-f2c5-4a23-8bf3-492ee78f87cd',
    'base_price': 6623,
    'date_from': '2025-08-08T10:11:16.675Z',
    'date_to': '2025-08-09T20:46:16.675Z',
    'destination': '2659e51a-09ce-488a-8b16-4f18fd005d6c',
    'is_favorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': 'ba163740-b075-4888-aae5-9df0d3a86cac',
    'base_price': 2319,
    'date_from': '2025-08-10T05:52:16.675Z',
    'date_to': '2025-08-12T06:25:16.675Z',
    'destination': '70a96e21-363d-4a4a-921b-2de42b545f4b',
    'is_favorite': true,
    'offers': [
      '2e78563f-4e6a-45ff-bac6-eb6bc1545e4e'
    ],
    'type': 'bus'
  },
  {
    'id': '40254338-8320-4564-98a3-6c8a040a511a',
    'base_price': 874,
    'date_from': '2025-08-13T07:20:16.675Z',
    'date_to': '2025-08-13T17:43:16.675Z',
    'destination': '70a96e21-363d-4a4a-921b-2de42b545f4b',
    'is_favorite': true,
    'offers': [
      'e6bc77bf-1e87-4828-922c-1ade99dd9a90',
      '0c39c9b0-59a4-4f2b-a39d-e458c5494f7c',
      'cbfe35e0-1f94-439d-b8e5-57da931c9123'
    ],
    'type': 'check-in'
  },
  {
    'id': 'cdcc1ff0-5790-42de-b49b-34a68b235205',
    'base_price': 6330,
    'date_from': '2025-08-14T20:06:16.675Z',
    'date_to': '2025-08-16T08:58:16.675Z',
    'destination': 'd70ae645-ab35-40b5-9fd0-ede8be6423e2',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '2e43fe79-a923-4e39-a3df-0a3d9503e7ea',
    'base_price': 1398,
    'date_from': '2025-08-18T07:30:16.675Z',
    'date_to': '2025-08-19T06:40:16.675Z',
    'destination': 'd0764400-e27c-441e-ac2c-e5d0b75d9e7b',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '84e4268f-d969-404e-a5c4-91dc2f2455b9',
    'base_price': 4223,
    'date_from': '2025-08-20T22:56:16.675Z',
    'date_to': '2025-08-21T22:28:16.675Z',
    'destination': 'd0764400-e27c-441e-ac2c-e5d0b75d9e7b',
    'is_favorite': true,
    'offers': [
      'ff341003-6139-452e-8028-7aecf596430b',
      'e6bc77bf-1e87-4828-922c-1ade99dd9a90',
      '0c39c9b0-59a4-4f2b-a39d-e458c5494f7c',
      'cbfe35e0-1f94-439d-b8e5-57da931c9123'
    ],
    'type': 'check-in'
  },
  {
    'id': 'ac4c6cc9-399e-4064-8ab0-f258e0b256aa',
    'base_price': 480,
    'date_from': '2025-08-22T07:31:16.675Z',
    'date_to': '2025-08-24T05:57:16.675Z',
    'destination': '70a96e21-363d-4a4a-921b-2de42b545f4b',
    'is_favorite': false,
    'offers': [
      '9a7404fb-6332-4788-b7eb-f54ea54a8cef'
    ],
    'type': 'train'
  },
  {
    'id': '01bd66a2-4bb7-4eb1-82a9-947a6e5ec17e',
    'base_price': 9313,
    'date_from': '2025-08-25T04:07:16.675Z',
    'date_to': '2025-08-26T14:23:16.675Z',
    'destination': '66b2d604-9ea6-423c-9c25-76df52062767',
    'is_favorite': true,
    'offers': [
      '1313b1ba-8964-4e6a-9e56-5c396553e264',
      'c6a275b0-f0b6-4cc2-a46e-86f5f123d1a0'
    ],
    'type': 'drive'
  },
  {
    'id': '2e349038-ac89-46b5-97a2-3b81914dab28',
    'base_price': 7693,
    'date_from': '2025-08-27T11:16:16.675Z',
    'date_to': '2025-08-29T08:38:16.675Z',
    'destination': 'd0764400-e27c-441e-ac2c-e5d0b75d9e7b',
    'is_favorite': true,
    'offers': [
      'b776f99c-a648-47df-adfc-523290ae0740',
      'a59eba46-53f4-425c-8a65-a6ef3133092b',
      '5c6d9986-88c4-4f8a-b59f-10a67ba59cb6',
      '6e41217b-deee-45e3-8844-cb86fa86b6e5'
    ],
    'type': 'taxi'
  },
  {
    'id': '23ce5916-2a5a-4bc7-a5b0-5f5774535f61',
    'base_price': 4412,
    'date_from': '2025-08-31T03:22:16.675Z',
    'date_to': '2025-09-01T05:32:16.675Z',
    'destination': '70c275de-e44c-4792-9ad8-a13237883cbe',
    'is_favorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '61c6a563-ac21-4c08-a611-079c6756c615',
    'base_price': 9425,
    'date_from': '2025-09-02T12:35:16.675Z',
    'date_to': '2025-09-04T10:01:16.675Z',
    'destination': '66b2d604-9ea6-423c-9c25-76df52062767',
    'is_favorite': false,
    'offers': [
      'd5aa38b1-1816-4718-b8e9-e0cf8b117d2a'
    ],
    'type': 'restaurant'
  },
  {
    'id': '26f0d83d-e47f-4aff-b1b1-df99919fe0db',
    'base_price': 952,
    'date_from': '2025-09-05T12:14:16.675Z',
    'date_to': '2025-09-06T16:44:16.675Z',
    'destination': '2659e51a-09ce-488a-8b16-4f18fd005d6c',
    'is_favorite': true,
    'offers': [
      '2e78563f-4e6a-45ff-bac6-eb6bc1545e4e'
    ],
    'type': 'bus'
  },
  {
    'id': '3d3fdbdb-b344-4101-b44e-695ebe0bc041',
    'base_price': 9730,
    'date_from': '2025-09-08T03:51:16.675Z',
    'date_to': '2025-09-09T02:34:16.675Z',
    'destination': 'd0764400-e27c-441e-ac2c-e5d0b75d9e7b',
    'is_favorite': true,
    'offers': [
      'c6a275b0-f0b6-4cc2-a46e-86f5f123d1a0'
    ],
    'type': 'drive'
  },
  {
    'id': '18df7737-35d6-4c75-8eba-735b103903df',
    'base_price': 2174,
    'date_from': '2025-09-10T00:27:16.675Z',
    'date_to': '2025-09-11T14:07:16.675Z',
    'destination': 'fb337991-8d0f-4b77-9755-f1116ef3be19',
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '217ed30b-ce41-48ff-8288-6f1e8d9d7d84',
    'base_price': 979,
    'date_from': '2025-09-12T19:16:16.675Z',
    'date_to': '2025-09-14T18:47:16.675Z',
    'destination': 'd70ae645-ab35-40b5-9fd0-ede8be6423e2',
    'is_favorite': false,
    'offers': [
      '9a7404fb-6332-4788-b7eb-f54ea54a8cef'
    ],
    'type': 'train'
  },
  {
    'id': '48f751d3-1921-46d7-bfad-e77de5720611',
    'base_price': 5899,
    'date_from': '2025-09-15T08:16:16.675Z',
    'date_to': '2025-09-17T03:23:16.675Z',
    'destination': '70a96e21-363d-4a4a-921b-2de42b545f4b',
    'is_favorite': true,
    'offers': [
      '6786d33d-b074-4899-b8dc-f9399f309428',
      '275546b9-e423-4c1a-8b02-e29b058f8e7d',
      '4ce962f9-4b20-41c8-a72c-642ef9264898',
      '4dcd14e7-059f-4fe3-acab-1c1b3563afdf',
      '22db94a5-9e1c-4607-b2a5-56466d102d54',
      '6e611472-9407-4e26-ac13-853c6e258da4'
    ],
    'type': 'flight'
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomPointArray(pointsMock)
  };
}

export { pointsMock, getRandomPoint };
