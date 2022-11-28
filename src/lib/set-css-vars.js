/**
 * Define css vars no root
 * @param {object} data
 */
export function setCssVars(data) {
	const root = globalThis.document.documentElement
	for (const [k, v] of Object.entries(data)) {
		root.style.setProperty(k, v)
	}
}
