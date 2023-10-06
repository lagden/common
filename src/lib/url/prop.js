/**
 * Retrieves the value of a query parameter from a URL.
 *
 * @param {string} url - The URL containing query parameters.
 * @param {string} prop - The name of the query parameter to retrieve.
 * @returns {string|null} The value of the specified query parameter, or `null` if the parameter is not found.
 */
export function getProp(url, prop) {
	return new URL(url).searchParams.get(prop)
}
