/**
 * Remove dado do localStorage/sessionStorage
 * @param {string} k
 * @param {string} type
 */
export function removeStorage(k, type = 'localStorage') {
	globalThis?.[type].removeItem(k)
}
