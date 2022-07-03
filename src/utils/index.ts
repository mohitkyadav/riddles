export const isEmpty = (value: any) => {
  return value === undefined || value === null || value === "";
};

/**
 * @description Creates an array of length `size` filled with a unique random value between `0` and `size - 1`
 * @param size The length of the array to create
 * @returns An array of length `size` filled with a unique random value between `0` and `size - 1`
 * @example
 * ```ts
 * const array = createRandomArray(10);
 * console.log(array); // [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]
 * ```
 */
export const createRandomArray = (size: number) => {
  const array: Array<number> = [];

  for (let i = 0; i < size; i++) {
    const newNumber = Math.floor(Math.random() * size);

    if (array.includes(newNumber)) {
      i--;
    } else {
      array.push(newNumber);
    }
  }

  return array;
};

export const sleep = async (delayInMs: number) =>
  new Promise((r) => setTimeout(r, delayInMs));

export const getRandomIntApartFrom = (avoid: number, max: number): number => {
  const random = Math.floor(Math.random() * max) + 1;

  if (random === avoid) {
    return getRandomIntApartFrom(avoid, max);
  }

  return random;
};
