/**
 * Recursively searches for an object within a collection based on a key-value pair.
 *
 * @param {Array|Object} collection - The collection to search.
 * @param {*} key - The key to match.
 * @param {*} value - The value to match.
 * @returns {Object|undefined} The first object in the collection that matches the key-value pair, or undefined if not found.
 */
export function findRecursive(collection: any[] | any, key: any, value: any): any | undefined;
