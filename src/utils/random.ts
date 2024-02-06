export function getRandomNumber(limit: number) {
  return Math.floor(Math.random() * limit + 1);
}

export function getRandomItem<T>(list: T[] | readonly T[]) {
  return list[getRandomNumber(list.length) - 1];
}
