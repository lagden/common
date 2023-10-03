/**
 * Recursively searches for an object within a collection based on a key-value pair.
 *
 * @param {Array|Object} collection - The collection to search.
 * @param {*} key - The key to match.
 * @param {*} value - The value to match.
 * @returns {Object|undefined} The first object in the collection that matches the key-value pair, or undefined if not found.
 */
export function findRecursive(collection, key, value) {
	for (const item of collection ?? []) {
		const result = findInObject(item, key, value)
		if (result) {
			return result
		}
	}
}

/**
 * Recursively searches for a key-value pair within an object.
 *
 * @param {Object} obj - The object to search.
 * @param {*} key - The key to match.
 * @param {*} value - The value to match.
 * @returns {Object|undefined} The object that matches the key-value pair, or undefined if not found.
 */
function findInObject(...args) {
	const [obj, key, value] = args
	for (const [k, v] of Object.entries(obj)) {
		console.log({k, key, v, value})
		if (k === key && (v === value || (Array.isArray(v) && v.includes(value)))) {
			return obj
		}
		if (typeof v === 'object' && v !== null) {
			const next = findInObject(v, key, value)
			if (next) {
				return next
			}
		}
	}
}
