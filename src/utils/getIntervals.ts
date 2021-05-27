// eslint-disable-next-line @typescript-eslint/no-var-requires
const gauss = require('gauss');

function round(num, pre) {
  if (!pre) pre = 0;
  const pow = Math.pow(100, pre);
  return Math.round(num * pow) / pow;
}

export function getIntervals(arr) {
  //console.log(arr);
  const set = gauss.Vector([...arr]);
  let s = arr.length;
  // TODO optimize this
  if (s >= 6) {
    s = 6;
  }

  const q = set.quantile(s);
  const max = set.max();
  q.push(max);

  const result = [];

  let pre = 0;
  for (let i = 0; i <= q.length - 1; i++) {
    const value = round(q[i], 0);
    result.push(`${pre}-${value}`);
    pre = value;
  }
  return result;
}
