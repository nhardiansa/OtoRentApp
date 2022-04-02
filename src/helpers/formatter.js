export const priceFormat = price => {
  const res = String(price).split('').reverse();
  for (let i = 3; i < res.length; i += 4) {
    res.splice(i, 0, '.');
  }

  return res.reverse().join('');
};
