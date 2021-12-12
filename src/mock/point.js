import dayjs from 'dayjs';
import { getRandomInt } from './../utils';
import { generateOffer } from './offer';
import { generateDestination } from './destination';
import { OFFER_TYPE } from './../const/offerType';

const offers =  Array.from(Array(getRandomInt(2, 4)), generateOffer);

const generateDate = (later) => {
  const maxHoursGap = later ? 10 : 4;
  const minHoursGap = later ? 5 : 1;
  const hoursGap = getRandomInt(minHoursGap, maxHoursGap);

  return dayjs().add(hoursGap, 'hour').toDate();
};

export const generatePoint = (index) => {
  const type = OFFER_TYPE[getRandomInt(0, OFFER_TYPE.length -1)];
  return {
    'base_price': getRandomInt(1000, 1500),
    'date_from': generateDate(),
    'date_to': generateDate('later'),
    'destination': generateDestination(),
    'id': index,
    'is_favorite': Boolean(getRandomInt(0, 1)),
    'offers': offers.filter((item) => item.type === type),
    'type': type
  };
};
