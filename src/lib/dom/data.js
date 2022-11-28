/* eslint-disable unicorn/prefer-query-selector */

import {getTargetId} from './target.js'

// Convert
/**
 * Converte data-* atributos para objeto
 * @param {string} id - Id do elemento
 * @return {object} Retorna um objeto
 */
export function getData(id) {
	const TARGET_JS = getTargetId(id)
	const data = {}
	const element = globalThis.document.getElementById(TARGET_JS)
	if (element instanceof globalThis.HTMLElement) {
		for (const [key, value] of Object.entries(element.dataset)) {
			data[key] = value
		}
	}
	return data
}
