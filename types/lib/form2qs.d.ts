/**
 * Converts FormData to a query string or URLSearchParams object.
 *
 * @param {FormData} formData - The FormData object to convert.
 * @param {boolean} [toString=true] - A flag to specify whether to return the result as a query string.
 * @returns {string|URLSearchParams} - Returns a query string or URLSearchParams object depending on the `toString` flag.
 *
 * @example
 * // Returns 'key1=value1&key2=value2' as a query string
 * const formData = new FormData();
 * formData.append('key1', 'value1');
 * formData.append('key2', 'value2');
 * form2qs(formData);
 *
 * @example
 * // Returns URLSearchParams object
 * form2qs(formData, false);
 *
 * @example
 * // Returns 'fileInput=file.txt' when including File objects
 * const formDataWithFile = new FormData();
 * const file = new File(["content"], "file.txt");
 * formDataWithFile.append('fileInput', file);
 * form2qs(formDataWithFile);
 */
export function form2qs(formData: FormData, toString?: boolean): string | URLSearchParams;
