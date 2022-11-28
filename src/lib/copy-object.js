/**
 * Clona um objeto evitando referência - JSON
 * @param {object} obj - Objeto que será clonado
 * @return {object} Retorna um novo objeto
 */
export function copyObject(obj) {
	return JSON.parse(JSON.stringify(obj))
}
