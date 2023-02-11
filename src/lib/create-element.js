/**
 * Cria um elemento para ser adicionado no DOM
 * @param {string} element - Elemento
 * @param {Object} props  - Atributos do elemento
 * @return {HTMLElement} Retorna um elemento HTML
 */
export function createElement(element, props = {}) {
	const tag = globalThis.document.createElement(element)
	for (const [k, v] of Object.entries(props)) {
		if (k === 'dataset') {
			for (const [dk, dv] of Object.entries(v)) {
				tag[k][dk] = dv
			}
		} else {
			tag[k] = v
		}
	}
	return tag
}
