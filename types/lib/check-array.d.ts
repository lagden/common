/**
 * Checks if the provided data is an array and optionally if it is non-empty.
 *
 * @param {*} data - The data to check.
 * @param {boolean} [empty=true] - A flag to specify whether to check if the array is non-empty.
 * @returns {boolean} - Returns `true` if `data` is an array, and optionally checks for non-emptiness based on `empty`.
 *
 * @example
 * // Returns true if data is an array
 * checkArray([1, 2, 3]);
 *
 * @example
 * // Returns false if data is not an array
 * checkArray('not an array');
 *
 * @example
 * // Returns true if data is an array and not empty
 * checkArray([1, 2, 3], false);
 *
 * @example
 * // Returns false if data is an empty array and not checking for emptiness
 * checkArray([], false);
 */
export function checkArray(data: any, empty?: boolean): boolean;
