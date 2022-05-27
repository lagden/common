/**
 * Remove as propriedades reservadas do objeto
 * @param {object} props    - Objeto
 * @param {array}  reserved - Chaves
 * @return {object} Retorna um objeto filtrado
 */
export function filterProps(props, reserved) {
	const _reserved = new Set(reserved ?? [])
	return Object.keys(props).reduce((acc, cur) => {
		const isTrue = cur.includes('$$') || cur.includes('Class') || _reserved.has(cur)
		return isTrue ? acc : {...acc, [cur]: props[cur]}
	}, {})
}

/**
 * Ler a query string
 * @return {object} Retorna um objeto URLSearchParams
 */
export function params() {
	const url = new URL(globalThis.location)
	const _params = new URLSearchParams(url.search)
	return _params
}

/**
 * Transforma a query string em objeto
 * @return {object} Retorna um objeto
 */
export function qs() {
	const _data = {}
	for (const [k, v] of params()) {
		_data[k] = v
	}
	return _data
}

/**
 * Gera uma url com a qs + data-*
 * @param {string} endpoint - Endereço de disparo
 * @param {object} data     - Objeto
 * @return {string} Retorna uma URL
 */
export function fullURL(endpoint, data, useParams = true) {
	const url = new URL(endpoint)
	const _qs = useParams ? qs() : {}
	const _data = typeof data === 'object' ? data : {}
	for (const [k, v] of Object.entries({..._qs, ..._data})) {
		url.searchParams.set(k, v)
	}
	return url.href
}

/**
 * Clona um objeto evitando referência
 * @param {object} obj - Objeto que será clonado
 * @return {object} Retorna um novo objeto
 */
export function copyObject(obj) {
	if (typeof globalThis?.structuredClone === 'function') {
		return globalThis.structuredClone(obj)
	}
	return JSON.parse(JSON.stringify(obj))
}

/**
 * Converte o valor para número
 * @param {*} v - Valor que será convertido para número
 * @return {(number|any)} Se sucesso retorna o número
 */
export function parseNumber(v) {
	const regex = /^\d+\.(0+)?$/
	if (regex.test(v)) {
		return v
	}
	const value = Number(v)
	if (Number.isNaN(value)) {
		return v
	}
	return value
}

/**
 * Converte o valor para boolean
 * @param {*} v - Valor que será convertido para boolean
 * @param {boolean} force - Força a conversão
 * @return {(boolean|any)} Se sucesso retorna o boolean
 */
export function parseBoolean(v, force = true) {
	if (typeof v === 'boolean') {
		return v
	}
	const _v = String(v)
	const boolRegex = /^(?:true|false|1|0)$/i
	if (boolRegex.test(_v)) {
		return _v.toLowerCase() === 'true' || _v === '1'
	}
	return force ? Boolean(v) : v
}

/**
 * Seleciona um parser
 * @param {string} parse
 * @return {(function|undefined)} Se sucesso retorna a função
 */
export function parses(parse) {
	const opts = {
		number: parseNumber,
		boolean: parseBoolean,
	}
	return opts?.[parse]
}

/**
 * Evita problemas com eslint `unused`
 */
export function noop() {}

/**
 * Verifica se a variável é um Array
 * @param {array}   data         - variável
 * @param {boolean} [empty=true] - se falso, verifica se a variável contém dados
 * @return {boolean} Retorna true ou false
 */
export function checkArray(data, empty = true) {
	const _isArray = Array.isArray(data)
	if (empty) {
		return _isArray
	}
	return _isArray && data.length > 0
}

/**
 * Converte o objeto em string separado por `;`
 * @param {object}  data
 * @return {string} Retorna as propriedades
 */
export function obj2style(data) {
	const style = new Set()
	for (const [k, v] of Object.entries(data)) {
		style.add(`${k}: ${v}`)
	}
	return [...style].join(';')
}

/**
 * Define o dado no localStorage/sessionStorage
 * @param {string} k
 * @param {string} value
 * @param {string} type
 */
export function setStorage(k, value, type = 'localStorage') {
	if (globalThis?.[type]) {
		globalThis[type].setItem(k, value)
	}
}

/**
 * Pega o dado definido no localStorage/sessionStorage
 * @param {string}  k
 * @param {string} type
 * @return {string|null} Retorna o dado armazenado ou nulo
 */
export function getStorage(k, type = 'localStorage') {
	return globalThis?.[type].getItem(k)
}

/**
 * Remove dado do localStorage/sessionStorage
 * @param {string} k
 * @param {string} type
 */
export function removeStorage(k, type = 'localStorage') {
	globalThis?.[type].removeItem(k)
}

/**
 * Converte a coleção em objeto
 * @param {string} key        - Nome do campo que será a chave
 * @param {Array}  collection - Uma coleção de objetos
 * @return {object} Retorna um objeto
 */
export function arr2obj(key, collection = []) {
	if (checkArray(collection) === false) {
		return collection
	}

	const obj = {}
	for (const item of collection) {
		const k = item?.[key]
		if (k) {
			obj[k] = item
		}
	}
	return obj
}

/**
 * Define css vars no root
 * @param {object} data
 */
export function setCssVars(data) {
	const root = globalThis.document.documentElement
	for (const [k, v] of Object.entries(data)) {
		root.style.setProperty(k, v)
	}
}

/**
 * Preenche o template definido
 * @param {string} templateString - String com placeholders
 * @param {object} templateVars   - Objeto
 * @return {string} Retorna uma string
 */
export function template(templateString, templateVars) {
	return new Function('return `' + templateString + '`').call(templateVars)
}

/**
 * Gerador de id aleatório
 * @param {boolean} [removeDash=true] - remove o dash ("-") do uuid
 * @return {string} Retorna o uuid ou hexadecimal aleatório
 */
export function uuid(removeDash = true) {
	if (globalThis?.crypto?.randomUUID) {
		const _uuid = globalThis.crypto.randomUUID()
		return removeDash ? _uuid.replace(/-/g, '') : _uuid
	}
	return Number(Math.random()).toString(16).slice(2, 8) + Date.now().toString(16)
}

/**
 * Encontra um objeto no array
 * @param {array} collection - Coleção de objetos
 * @param {string} key
 * @param {(string|number)} value
 * @return {object} Retorna o object onde a chave/valor combinaram
 */
export function findRecursive(collection, key, value) {
	/* c8 ignore start */
	if (checkArray(collection, false)) {
		for (const item of collection) {
			for (const [k, v] of Object.entries(item)) {
				if (k === key && v === value) {
					return item
				}
				const next = findRecursive(v, key, value)
				if (next) {
					return next
				}
			}
		}
	}
	/* c8 ignore stop */
}
