import {baseURL} from './constants';

export const priceFormat = price => {
  const res = String(price).split('').reverse();
  for (let i = 3; i < res.length; i += 4) {
    res.splice(i, 0, '.');
  }

  return res.reverse().join('');
};

export const normalizeUrl = url => {
  const srcImg = url.replace('http://localhost:5000', baseURL);
  return {uri: srcImg};
};

export const capitalize = str => {
  return str
    .split(' ')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ');
};
