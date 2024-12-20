/**
 * Converte um objeto FormData em uma string de parâmetros de consulta ou um URLSearchParams.
 *
 * @param {FormData} formData - O objeto FormData a ser convertido.
 * @param {boolean} [toString=true] - Um indicador se o resultado deve ser retornado como uma string de parâmetros de consulta.
 *                                       Se `false`, retorna um objeto URLSearchParams.
 *
 * @returns {string|URLSearchParams} Uma string de parâmetros de consulta, se toString for verdadeiro; caso contrário, um objeto URLSearchParams.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', 'John Doe');
 * formData.append('age', '30');
 * const queryString = form2qs(formData);
 * // queryString será 'name=John+Doe&age=30'
 */
export function form2qs(formData: FormData, toString?: boolean): string | URLSearchParams;
