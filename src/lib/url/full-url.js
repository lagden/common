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
	const _data = data instanceof Object ? data : {}
	const _merge = {..._data, ..._qs}
	for (const [k, v] of Object.entries(_merge)) {
		url.searchParams.set(k, v)
	}
	return url.href
}
