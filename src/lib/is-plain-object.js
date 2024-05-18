/**
 * Checks if a value is a plain object.
 *
 * A plain object is an object created by the `{}` syntax or `new Object()`.
 * This function returns `false` for other types of objects like arrays, dates, etc.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a plain object, otherwise `false`.
 */
export function isPlainObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]'
}
