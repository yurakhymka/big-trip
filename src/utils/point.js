import dayjs from 'dayjs';

export const sortPointPrice = (pointA, pointB) => pointB.base_price - pointA.base_price;

export const sortPointDate = (pointA, pointB) => {
  const diffA = dayjs(pointA.date_to).diff(pointA.date_from);
  const diffB = dayjs(pointB.date_to).diff(pointB.date_from);

  return diffB - diffA;
};
