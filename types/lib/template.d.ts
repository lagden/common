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
export function template(templateString: string, templateVariables: object, options?: {
    undefinedReplacement?: string;
    useFlat?: boolean;
    regex?: RegExp;
}): string;
