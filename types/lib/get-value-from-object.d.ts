/**
 * Retrieves a value from a nested object based on a given path.
 *
 * @param {Object} obj - The object from which to retrieve the value.
 * @param {string} path - The path to the desired value, using dot notation (e.g., 'parent.child.grandchild').
 * @returns {*} - The value found at the specified path, or undefined if not found.
 */
export function getValueFromObject(obj: any, path: string): any;
