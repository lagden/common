import { copyObject } from './copy-object.js'

/**
 * Clona um objeto evitando referência - Ponyfill
 * @param {object} obj - Objeto que será clonado
 * @return {object} Retorna um novo objeto
 */
export function clone(obj) {
	try {
		if (typeof globalThis?.structuredClone === 'function') {
			return globalThis.structuredClone(obj)
		}
	} catch {
		return copyObject(obj)
	}
}
