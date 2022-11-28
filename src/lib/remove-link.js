/**
 * Remove a tag `<a>` da string
 * @param {string} value - conteúdo HTML
 * @return {string} Retorna a string sem link
 */
export function removeLink(value) {
	const regex = /<a (.+?)>(.+?)?<\/a>/gm
	return value.replaceAll(regex, '$2')
}
