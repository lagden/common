/**
 * Debounce - Atrasa a função dada até que o tempo de espera declarado em milissegundos tenha passado desde a última vez que esta função de foi chamada.
 * @param {function} callback - função de callback
 * @param {number} [wait=100] - Tempo de espera em ms
 * @return {function} Retorna a função de callback
 */
export function debounce(callback, wait = 100) {
	let timeoutId
	return (...args) => {
		globalThis.clearTimeout(timeoutId)
		timeoutId = globalThis.setTimeout(() => {
			callback(...args)
		}, wait)
	}
}
