/**
 * Constructs and normalizes a URL string based on a given value.
 *
 * @param {string} value - The value used to construct the URL.
 * @returns {string} A normalized URL string.
 */
export function getURL(value) {
	const url = (new URL('./', value).href).slice(0, -1)
	return url
}
