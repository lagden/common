import test from 'ava'
import * as lib from '../src/common.js'

function storage() {
	return {
		getItem(k) {
			return this?.[k]
		},
		setItem(k, v) {
			this[k] = v
		},
		removeItem(k) {
			Reflect.deleteProperty(this, k)
		},
	}
}

class FormData {
	constructor() {
		this.data = new Set()
	}

	append(k, v) {
		this.data.add([k, v])
	}

	entries() {
		return [...this.data]
	}
}

test.before(() => {
	globalThis.location = new URL('http://127.0.0.1/?test=1')
	globalThis.structuredClone = obj => JSON.parse(JSON.stringify(obj))
	globalThis.localStorage = storage()
	globalThis.sessionStorage = storage()
	globalThis.document = {
		documentElement: {
			style: {
				setProperty(k, v) {
					lib.noop(k, v)
				},
			},
		},
	}
	globalThis.requestAnimationFrame = fn => {
		fn()
		return lib.uuid()
	}
	globalThis.cancelAnimationFrame = lib.noop
	globalThis.crypto = {
		randomUUID() {
			return 'ffcc00-ffcc00'
		},
	}
})

test('filterProps', t => {
	const data = lib.filterProps({a: 1, b: 2, c: 3}, 'b')
	t.is(JSON.stringify(data), JSON.stringify({a: 1, c: 3}))

	const other = lib.filterProps({a: 1, $$: 2, c: 3})
	t.is(JSON.stringify(other), JSON.stringify({a: 1, c: 3}))
})

test('params', t => {
	const data = lib.params()
	t.is(data.get('test'), '1')
})

test('qs', t => {
	const data = lib.qs()
	t.is(data.test, '1')
})

test('fullURL', t => {
	let data
	data = lib.fullURL('http://127.0.0.1/run/', {foo: 'bar'})
	t.is(data, 'http://127.0.0.1/run/?test=1&foo=bar')

	data = lib.fullURL('http://127.0.0.1/run/', undefined, false)
	t.is(data, 'http://127.0.0.1/run/')
})

test('copyObject', t => {
	const obj = {a: 1, b: 2, c: undefined}
	const data = lib.copyObject(obj)
	t.not(data, obj)
})

test('clone', t => {
	const obj = {a: 1, b: 2, c: 3}
	let data

	data = lib.clone(obj)
	t.not(data, obj)

	globalThis.structuredClone = undefined
	data = lib.clone(obj)
	t.not(data, obj)
})

test('parseNumber', t => {
	t.is(lib.parseNumber('foo'), 'foo')
	t.is(lib.parseNumber('1'), 1)
	t.is(lib.parseNumber('1.123'), 1.123)
	t.is(lib.parseNumber('1.'), '1.')
	t.is(lib.parseNumber(1.123), 1.123)
})

test('parseBoolean', t => {
	t.true(lib.parseBoolean('1'))
	t.false(lib.parseBoolean('0'))
	t.true(lib.parseBoolean('true'))
	t.false(lib.parseBoolean('false'))
	t.true(lib.parseBoolean(true))
	t.false(lib.parseBoolean(false))
	t.true(lib.parseBoolean('foo'))
	t.is(lib.parseBoolean('foo', false), 'foo')
})

test('parses', t => {
	t.is(typeof lib.parses('number'), 'function')
	t.is(lib.parses('invalid'), undefined)
})

test('noop', t => {
	lib.noop()
	t.pass('noop')
})

test('checkArray', t => {
	const data = []
	const other = [1, 2, 3]
	t.true(lib.checkArray(data))
	t.false(lib.checkArray(data, false))
	t.true(lib.checkArray(other, false))
})

test('obj2style', t => {
	const data = {color: 'green', width: '100%'}
	t.is(lib.obj2style(data), 'color: green;width: 100%')
})

test('storage', t => {
	lib.setStorage('test', 'foo')
	lib.setStorage('test', 'bar', 'sessionStorage')
	t.is(lib.getStorage('test'), 'foo')
	t.is(lib.getStorage('other'), undefined)
	t.is(lib.getStorage('test', 'sessionStorage'), 'bar')
	lib.removeStorage('test')
	lib.removeStorage('test', 'sessionStorage')
	t.is(lib.getStorage('test'), undefined)
	t.is(lib.getStorage('test', 'sessionStorage'), undefined)
})

test('arr2obj', t => {
	const data = [
		{color: 'green', width: '100%'},
		{color: 'red', width: '100%'},
	]

	const result = lib.arr2obj('color', data)
	t.is(JSON.stringify(result), JSON.stringify({
		green: {color: 'green', width: '100%'},
		red: {color: 'red', width: '100%'},
	}))

	t.is(JSON.stringify(lib.arr2obj('xxx', data)), JSON.stringify({}))
	t.is(JSON.stringify(lib.arr2obj('color', result)), JSON.stringify(result))
})

test('setCssVars', t => {
	const data = {
		'--color': 'green',
		'--width': '100%',
	}

	lib.setCssVars(data)
	t.pass('setCssVars')
})

test('template', t => {
	const templateString = 'Me chamo ${this.name}'
	const templateVars = {name: 'Teste'}
	const result = lib.template(templateString, templateVars)
	t.is(result, 'Me chamo Teste')
})

test('uuid', t => {
	lib.uuid()
	lib.uuid(false)
	globalThis.crypto = undefined
	lib.uuid()
	t.pass('uuid')
})

test('findRecursive', t => {
	const collection = [
		{
			foo: [
				{
					noop: [
						{id: 1, name: 'a'},
						{id: 2, name: 'b'},
						{id: 3, name: 'c'},
					],
				},
			],
		}, {
			bar: 'baz',
		}, {
			xxx: ['a', 'b', 'c'],
		},
	]
	const a = lib.findRecursive(collection, 'id', 2)
	const b = lib.findRecursive('test', 'id', 2)
	const c = lib.findRecursive(collection.xxx, 'id', 2)
	t.is(a.name, 'b')
	t.is(b, undefined)
	t.is(c, undefined)
})

test('form2qs', t => {
	const formData = new FormData()
	formData.append('foo', 1)
	formData.append('foo', 2)
	formData.append('bar', 3)
	const qs = lib.form2qs(formData)
	t.is(qs, 'foo=1&foo=2&bar=3')
})

test('removeLink', t => {
	const html = 'Clique <a rel="noopenner" target="_blank" href="https://buscacepinter.correios.com.br/app/endereco/index.php">aqui</a>'
	const v = lib.removeLink(html)
	t.is(v, 'Clique aqui')
})
