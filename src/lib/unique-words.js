/**
 * Returns a string containing unique words from the provided arguments.
 *
 * @param {...string} args - The input arguments containing words.
 * @returns {string} A string containing unique words separated by spaces.
 */
export function uniqueWords(...args) {
	const result = new Set()
	for (const words of args) {
		for (const word of String(words).trim().split(/\s+/)) {
			result.add(word)
		}
	}

	return [...result].join(' ')
}
