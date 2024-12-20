/**
 * Gera uma url com a qs + data-*
 * @param {string} url                     - Endereço de disparo
 * @param {object} data                    - data-* ou objeto
 * @param {boolean} [useQueryString=true]  - querystring
 * @param {Array<string>} [ignoreProps=[]] - chaves que deverão ser ignorados
 * @return {string} Retorna uma URL
 */
export function fullURL(url: string, data: object, useQueryString?: boolean, ignoreProps?: Array<string>): string;
