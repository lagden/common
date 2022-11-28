/**
 * Verifica se a variável é um Array
 * @param {array}   data         - variável
 * @param {boolean} [empty=true] - se falso, verifica se a variável contém dados
 * @return {boolean} Retorna true ou false
 */
export function checkArray(data, empty = true) {
	const _isArray = Array.isArray(data)
	if (empty) {
		return _isArray
	}
	return _isArray && data.length > 0
}
