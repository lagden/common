/**
 * Retrieves a value from a nested object based on a given path.
 *
 * @param {Object} obj - The object from which to retrieve the value.
 * @param {string} path - The path to the desired value, using dot notation (e.g., 'parent.child.grandchild').
 * @returns {*} - The value found at the specified path, or undefined if not found.
 */
export function getValueFromObject(obj, path) {
	// Split the path string into an array of keys.
	const keys = path.split('.')

	// Initialize the value to the root object.
	let value = obj

	// Iterate through each key in the path array.
	for (const key of keys) {
		// Access the value corresponding to the current key.
		value = value[key]

		// If the value is undefined, return undefined.
		if (value === undefined) {
			return undefined
		}
	}

	// Return the final value found at the end of the path.
	return value
}
