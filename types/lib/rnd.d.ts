/**
 * Generates a random hexadecimal string by combining a random number and the current timestamp.
 *
 * @returns {string} A random hexadecimal string.
 */
export function rnd(): string;
/**
 * Generates a UUID (Universally Unique Identifier) using the browser's crypto API or a random string.
 *
 * @param {boolean} [removeDash=true] - Whether to remove dashes from the generated UUID.
 * @returns {string} A UUID string.
 */
export function uuid(removeDash?: boolean): string;
