/**
 * Converte o valor para boolean
 * @param {*} v - Valor que será convertido para boolean
 * @param {boolean} force - Força a conversão
 * @return {(boolean|any)} Se sucesso retorna o boolean
 */
export function parseBoolean(v, force = true) {
	if (typeof v === 'boolean') {
		return v
	}
	const _v = String(v)
	const boolRegex = /^(?:true|false|1|0)$/i
	if (boolRegex.test(_v)) {
		return _v.toLowerCase() === 'true' || _v === '1'
	}
	return force ? Boolean(v) : v
}
