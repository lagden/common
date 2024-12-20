/**
 * Recursively searches for an object within a collection based on a key-value pair.
 *
 * @param {Array|Object} collection - The collection to search.
 * @param {*} key - The key to match.
 * @param {*} value - The value to match.
 * @returns {Object|undefined} The first object in the collection that matches the key-value pair, or undefined if not found.
 */
export function findRecursive(collection, key, value) {
	for (const item of collection ?? []) {
		const result = findInObject(item, key, value)
		if (result) {
			return result
		}
	}
}

/**
 * Encontra um objeto em um objeto aninhado que contém uma chave e um valor específicos.
 *
 * @param {...(Object|String|*)} args - Os argumentos a serem passados para a função:
 *   - {Object} obj - O objeto onde a pesquisa será realizada.
 *   - {String} key - A chave a ser procurada no objeto.
 *   - {*} value - O valor correspondente à chave a ser procurado. Pode ser um valor simples ou um valor dentro de um array.
 *
 * @returns {Object|null} O objeto onde a chave e o valor foram encontrados, ou null se não for encontrado.
 *
 * @example
 * const result = findInObject({ a: { b: [1, 2, 3] } }, 'b', 2);
 * // result será { b: [1, 2, 3] }
 */
function findInObject(...args) {
	const [obj, key, value] = args
	for (const [k, v] of Object.entries(obj)) {
		if (k === key && (v === value || (Array.isArray(v) && v.includes(value)))) {
			return obj
		}
		if (typeof v === 'object' && v !== null) {
			const next = findInObject(v, key, value)
			if (next) {
				return next
			}
		}
	}
}
