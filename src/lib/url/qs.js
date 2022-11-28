import {params} from './params.js'

/**
 * Transforma a query string em objeto
 * @return {object} Retorna um objeto
 */
export function qs() {
	const _data = {}
	for (const [k, v] of params()) {
		_data[k] = v
	}
	return _data
}
