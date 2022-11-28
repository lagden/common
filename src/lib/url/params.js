/**
 * Ler a query string
 * @param {string} [url=undefined] - URL String
 * @return {object} Retorna um objeto URLSearchParams
 */
export function params(url) {
	const _url = new URL(url ?? globalThis.location.href)
	const _params = new URLSearchParams(_url.search)
	return _params
}
