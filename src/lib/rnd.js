/**
 * Gerador de id aleatório
 * @param {boolean} [removeDash=true] - remove o dash ("-") do uuid
 * @return {string} Retorna o uuid ou hexadecimal aleatório
 */
export function rnd(removeDash = true) {
	if (globalThis?.crypto?.randomUUID) {
		const _uuid = globalThis.crypto.randomUUID()
		return removeDash ? _uuid.replaceAll('-', '') : _uuid
	}
	/* c8 ignore next */
	return Number(Math.random()).toString(16).slice(2, 8) + Date.now().toString(16)
}
