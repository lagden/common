/**
 * Pega a propriedade da query string
 * @param {string} url         - url
 * @param {string} [prop='id'] - propriedade
 * @return {string} Retorna o valor da propriedade ou null
 */
export function getProp(url, prop = 'id') {
	return new URL(url).searchParams.get(prop)
}
