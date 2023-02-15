import {flattenObject} from './flatten-object.js'

/**
 * Preenche o template definido
 * @param {string} templateString            - String com placeholders
 * @param {object} templateVars              - Objeto
 * @param {string} [undefinedReplacement=''] - Valor para substituição indefinida
 * @param {boolean} [useFlat=true]           - Nivela o objeto em um único nível
 * @return {string} Retorna uma string
 */
export function template(templateString, templateVariables, undefinedReplacement = '', useFlat = true) {
	const _regex = /\${"([^"]*?)"}/gm
	const _ref = useFlat ? flattenObject(templateVariables) : templateVariables
	return templateString.replace(_regex, (_, g) => _ref?.[g] ?? undefinedReplacement)
}
