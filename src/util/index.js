export function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

export function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}