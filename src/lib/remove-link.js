/**
 * Remove o link da string
 * @param {string} value - conteúdo HTML
 * @return {string} Retorna a string sem link
 */
export function removeLink(value) {
	const regex = /<a [^>]+>?|<a>|<\/a>/gm
	return value.replaceAll(regex, '')
}
