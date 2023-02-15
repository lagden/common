/**
 * Verifica os valores
 *
 * @param {any} val valor
 * @returns {boolean} Retorna true/false
 */
function _verify(val) {
	const test = [
		typeof val === 'object',
		val !== null,
		val instanceof Date === false,
		val instanceof RegExp === false,
		Array.isArray(val) === false,
	]
	return test.every(Boolean)
}

/**
 * Achata o `objeto` em um único nível.
 *
 * @param {object} obj    objeto que será achatado
 * @param {string} delim  símbolo usado para unir as chaves
 * @returns {object} Retorna um novo objeto achatado
 */
export function flattenObject(obj, delim = '.') {
	const nobj = {}
	for (const [key, val] of Object.entries(obj)) {
		if (_verify(val)) {
			for (const [k, v] of Object.entries(flattenObject(val, delim))) {
				nobj[key + delim + k] = v
			}
		} else {
			nobj[key] = val
		}
	}
	return nobj
}
