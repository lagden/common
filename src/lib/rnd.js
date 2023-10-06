/**
 * Generates a random hexadecimal string by combining a random number and the current timestamp.
 *
 * @returns {string} A random hexadecimal string.
 */
export function rnd() {
	return Number(Math.random()).toString(16).slice(2, 8) + Date.now().toString(16)
}

/**
 * Generates a UUID (Universally Unique Identifier) using the browser's crypto API or a random string.
 *
 * @param {boolean} [removeDash=true] - Whether to remove dashes from the generated UUID.
 * @returns {string} A UUID string.
 */
export function uuid(removeDash = true) {
	/* c8 ignore next */
	const _uuid = globalThis?.crypto?.randomUUID() ?? rnd()
	return removeDash ? _uuid.replaceAll('-', '') : _uuid
}
