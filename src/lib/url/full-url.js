/**
 * Gera uma url com a qs + data-*
 * @param {string} url                     - Endereço de disparo
 * @param {object} data                    - data-* ou objeto
 * @param {boolean} [useQueryString=true]  - querystring
 * @param {Array<string>} [ignoreProps=[]] - chaves que deverão ser ignorados
 * @return {string} Retorna uma URL
 */
export function fullURL(url, data, useQueryString = true, ignoreProps = []) {
	const _ignoreProps = new Set(ignoreProps)
	const _url = new URL(url)
	const _qs = useQueryString ? new URL(globalThis.location.href).searchParams : new URLSearchParams()
	const _data = data instanceof Object ? data : {}
	const _merge = new URLSearchParams([...Object.entries(_data), ..._qs.entries()])
	for (const [k, v] of _merge.entries()) {
		if (_ignoreProps.has(k) === false) {
			_url.searchParams.set(k, v)
		}
	}
	return _url.href
}
