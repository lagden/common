import {flattenObject} from './flatten-object.js'

/**
 * Substitui variáveis em uma string de modelo por seus valores correspondentes.
 *
 * @param {string} templateString - A string de modelo contendo variáveis a serem substituídas.
 * @param {object} templateVariables - Um objeto contendo as variáveis e seus valores correspondentes.
 * @param {object} [options] - Opções para controlar o processo de substituição.
 * @param {string} [options.undefinedReplacement=''] - O valor a ser usado quando uma variável não está definida no objeto.
 * @param {boolean} [options.useFlat=true] - Indica se o objeto de variáveis deve ser achatado antes da substituição.
 * @param {RegExp} [options.regex=/\${"([^"]*?)"}/gm] - Expressão regular para corresponder às variáveis no modelo.
 * @returns {string} A string de modelo com as variáveis substituídas por seus valores.
 */
export function template(templateString, templateVariables, options) {
	const {
		undefinedReplacement = '',
		useFlat = true,
		regex = /\${"([^"]*?)"}/gm,
	} = options ?? {}

	const _ref = useFlat ? flattenObject(templateVariables) : templateVariables

	/**
	 * Função de substituição para usar com o método `replace`.
	 *
	 * @param {string} _ - A correspondência completa da expressão regular.
	 * @param {string} g - O grupo de captura da expressão regular, contendo o nome da variável.
	 * @returns {string} O valor correspondente da variável ou o valor de substituição indefinido.
	 */
	const replacementFunction = (_, g) => _ref?.[g] ?? undefinedReplacement

	return templateString.replace(regex, replacementFunction)
}
