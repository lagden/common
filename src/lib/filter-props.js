/**
 * Remove as propriedades reservadas do objeto
 * @param {object} props    - Objeto
 * @param {array}  reserved - Chaves
 * @return {object} Retorna um objeto filtrado
 */
export function filterProps(props, reserved) {
	const _reserved = new Set(reserved ?? [])
	return Object.keys(props).reduce((acc, cur) => {
		const isTrue = cur.includes('$$') || cur.includes('Class') || _reserved.has(cur)
		return isTrue ? acc : {...acc, [cur]: props[cur]}
	}, {})
}
