/**
 * Pega o dado definido no localStorage/sessionStorage
 * @param {string}  k
 * @param {string} type
 * @return {string|null} Retorna o dado armazenado ou nulo
 */
export function getStorage(k, type = 'localStorage') {
	return globalThis?.[type].getItem(k)
}
