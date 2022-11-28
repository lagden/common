import {qs} from './qs.js'

/**
 * Gera uma url com a qs + data-*
 * @param {string} endpoint           - Endereço de disparo
 * @param {object} data               - data-*
 * @param {boolean} [useParams=false] - querystring
 * @return {string} Retorna uma URL
 */
export function fullURL(endpoint, data, useParams = true) {
	const url = new URL(endpoint)
	const _qs = useParams ? qs() : {}
	const _data = typeof data === 'object' ? data : {}
	for (const [k, v] of Object.entries({..._qs, ..._data})) {
		url.searchParams.set(k, v)
	}
	return url.href
}
