/**
 * Parses a value into a boolean.
 *
 * @param {*} v - The value to be parsed into a boolean.
 * @returns {boolean} A boolean representation of the input value.
 */
export function parseBoolean(v) {
	if (typeof v === 'boolean') {
		return v
	}
	const _v = String(v).toLowerCase()
	return _v === 'true' || _v === '1'
}
