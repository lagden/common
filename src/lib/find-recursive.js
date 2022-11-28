import {checkArray} from './check-array.js'

/**
 * Encontra um objeto no array
 * @param {array} collection - Coleção de objetos
 * @param {string} key
 * @param {(string|number)} value
 * @return {object} Retorna o object onde a chave/valor combinaram
 */
export function findRecursive(collection, key, value) {
	/* c8 ignore start */
	if (checkArray(collection, false)) {
		for (const item of collection) {
			for (const [k, v] of Object.entries(item)) {
				if (k === key && v === value) {
					return item
				}
				const next = findRecursive(v, key, value)
				if (next) {
					return next
				}
			}
		}
	}
	/* c8 ignore stop */
}
