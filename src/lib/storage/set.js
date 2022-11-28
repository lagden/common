/**
 * Define o dado no localStorage/sessionStorage
 * @param {string} k
 * @param {string} value
 * @param {string} type
 */
export function setStorage(k, value, type = 'localStorage') {
	if (globalThis?.[type]) {
		globalThis[type].setItem(k, value)
	}
}
