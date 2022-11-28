/**
 * Gerador de id aleatório
 * @param {boolean} [removeDash=true] - remove o dash ("-") do uuid
 * @return {string} Retorna o uuid ou hexadecimal aleatório
 */
export function uuid(removeDash = true) {
	if (globalThis?.crypto?.randomUUID) {
		const _uuid = globalThis.crypto.randomUUID()
		return removeDash ? _uuid.replace(/-/g, '') : _uuid
	}
	return Number(Math.random()).toString(16).slice(2, 8) + Date.now().toString(16)
}
