import { parseBoolean } from './boolean.js'
import { parseNumber } from './number.js'

/**
 * Seleciona um parser
 * @param {string} parse
 * @return {(function|undefined)} Se sucesso retorna a função
 */
export function parses(parse) {
	const opts = {
		number: parseNumber,
		boolean: parseBoolean,
	}
	return opts?.[parse]
}
