/**
 * Converte o valor para número
 * @param {*} v - Valor que será convertido para número
 * @return {(number|any)} Se sucesso retorna o número
 */
export function parseNumber(v) {
	const regex = /^\d+\.(0+)?$/
	if (regex.test(v)) {
		return v
	}
	const value = Number(v)
	if (Number.isNaN(value)) {
		return v
	}
	return value
}
