/**
 * Retrieves a value from a nested object based on a given path.
 *
 * @param {Object} obj - The object from which to retrieve the value.
 * @param {string} path - The path to the desired value, using dot notation (e.g., 'parent.child.grandchild').
 * @returns {*} - The value found at the specified path, or undefined if not found.
 */
export function getValueFromObject(obj, path) {
	// Split the path string into individual keys
	const keys = path.split('.')

	// Start with the original object
	let currentObj = obj

	// Iterate over each key in the path
	for (const key of keys) {
		// If the current object is null or undefined, return undefined
		if ((currentObj ?? false) === false) {
			return undefined
		}

		// If the key contains an array accessor, extract the index
		if (key.includes('[') && key.includes(']')) {
			const [arrayKey, indexStr] = key.split('[')
			const index = parseInt(indexStr.replace(']', ''), 10)
			currentObj = currentObj[arrayKey][index]
		} else {
			// Otherwise, just access the property normally
			currentObj = currentObj[key]
		}
	}

	// Return the final value
	return currentObj
}
