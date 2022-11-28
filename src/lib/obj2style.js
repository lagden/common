/**
 * Converte o objeto em string separado por `;`
 * @param {object}  data
 * @return {string} Retorna as propriedades
 */
export function obj2style(data) {
	const style = new Set()
	for (const [k, v] of Object.entries(data)) {
		style.add(`${k}: ${v}`)
	}
	return [...style].join(';')
}
