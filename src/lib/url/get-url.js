import {dirname} from './dirname.js'

/**
 * Path da URL sem o nome
 * @param {string} value - url
 * @return {string} Path da URL
 */
export function getURL(value) {
	const {url} = dirname(value)
	return url
}
