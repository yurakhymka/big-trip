import { getRandomInt } from './../utils';
import { OFFERS } from './../const/offers';
import { OFFER_TYPE } from '../const/offerType';


const offerType = () =>  {
  const index = getRandomInt(0, OFFER_TYPE.length - 1);
  return OFFER_TYPE[index];
};

const getOffers = () => OFFERS.filter((item, index) => index <= getRandomInt(0, OFFERS.length - 1));

export const generateOffer = () => ({
  'type': offerType(),
  'offers': getOffers()
});
