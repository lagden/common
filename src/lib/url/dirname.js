/**
 * Dirname da URL
 * @param {string} value - url
 * @return {object} Retorna um objeto
 */
export function dirname(value) {
	const _url = new URL(value)
	const _pathname = _url.pathname.split('/')
	const _href = _url.href.split('/')
	_pathname.pop()
	_href.pop()
	const path = _pathname.join('/')
	const url = _href.join('/')
	return {
		path,
		url,
	}
}
