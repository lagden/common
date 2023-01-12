/**
 * Transforma a query string em objeto
 * @param {string} [url=undefined] - URL String
 * @return {object} Retorna um objeto
 */
export function qs(url) {
	const _url = new URL(url ?? globalThis.location.href)
	const _params = new URLSearchParams(_url.search)
	const _data = {}
	for (const [k, v] of _params) {
		_data[k] = v
	}
	return _data
}
