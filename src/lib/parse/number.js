/**
 * Parses a value into a number, or returns the original value if it matches a specific format or cannot be converted.
 *
 * @param {*} v - The value to be parsed into a number.
 * @returns {number|string} A numeric representation of the input value, or the original value if parsing is not possible.
 */
export function parseNumber(v) {
	const regex = /^\d+\.(0+)?$/
	if (regex.test(v)) {
		return v
	}
	const value = Number(v)
	if (Number.isNaN(value)) {
		return v
	}
	return value
}
