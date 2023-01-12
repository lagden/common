/**
 * Path da URL sem o nome
 * @param {string} value - url
 * @return {string} Path da URL
 */
export function getURL(value) {
	const url = (new URL('./', value).href).slice(0, -1)
	return url
}
