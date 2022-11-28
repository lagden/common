/**
 * Preenche o template definido
 * @param {string} templateString - String com placeholders
 * @param {object} templateVars   - Objeto
 * @return {string} Retorna uma string
 */
export function template(templateString, templateVars) {
	return new Function('return `' + templateString + '`').call(templateVars)
}
