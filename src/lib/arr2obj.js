import {checkArray} from './check-array.js'

/**
 * Converte a coleção em objeto
 * @param {string} key        - Nome do campo que será a chave
 * @param {Array}  collection - Uma coleção de objetos
 * @return {object} Retorna um objeto
 */
export function arr2obj(key, collection = []) {
	if (checkArray(collection) === false) {
		return collection
	}

	const obj = {}
	for (const item of collection) {
		const k = item?.[key]
		if (k) {
			obj[k] = item
		}
	}
	return obj
}
