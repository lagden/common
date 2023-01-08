/**
 * Preenche o template definido
 * @param {string} templateString - String com placeholders
 * @param {object} templateVars   - Objeto
 * @param {string} [undefinedReplacement=''] - Valor para substituição indefinida
 * @return {string} Retorna uma string
 */
export function template(templateString, templateVariables, undefinedReplacement = '') {
	const _regex = /\${"([^"]*?)"}/gm
	return templateString.replace(_regex, (_, g) => templateVariables?.[g] ?? undefinedReplacement)
}
