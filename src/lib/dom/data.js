/**
 * Converte data-* atributos para objeto
 * @param {string} id - ID do elemento
 * @return {object} Retorna um objeto
 */
export function getData(id) {
	const data = {}
	const element = globalThis.document.getElementById(id)
	if (element instanceof globalThis.HTMLElement) {
		for (const [key, value] of Object.entries(element.dataset)) {
			data[key] = value
		}
	}
	return data
}
