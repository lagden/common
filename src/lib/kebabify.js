/**
 * Convert camel/snake case to kebab case
 * @param {string} value
 * @return {string} kebab case
 */
export function kebabify(value) {
	const _v = value.replaceAll(/[_-]/g, '').replaceAll(/[A-Z]/g, (m) => '-' + m.toLowerCase())
	if (_v?.[0] === '-') {
		return _v.slice(1)
	}
	return _v
}
