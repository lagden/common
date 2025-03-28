import test from 'ava'
import { JSDOM } from 'jsdom'
import * as sinon from 'sinon'
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

test.before(() => {
	globalThis.location = new URL('http://127.0.0.1/?test=1')
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
	globalThis.requestAnimationFrame = (fn) => {
		fn()
		return lib.uuid()
	}
	globalThis.cancelAnimationFrame = lib.noop
	// globalThis.crypto = crypto

	const dom = new JSDOM('<div id=xxx data-one=foo data-two=bar />')
	globalThis.document = dom.window.document
	globalThis.HTMLElement = dom.window.HTMLElement
	// console.log(dom)
})

test('filterProps', (t) => {
	const data = lib.filterProps({ a: 1, b: 2, c: 3 }, 'b')
	t.is(JSON.stringify(data), JSON.stringify({ a: 1, c: 3 }))

	const other = lib.filterProps({ a: 1, $$: 2, c: 3 })
	t.is(JSON.stringify(other), JSON.stringify({ a: 1, c: 3 }))
})

test('params', (t) => {
	const data = lib.params()
	t.is(data.get('test'), '1')
})

test('qs', (t) => {
	const data = lib.qs()
	t.is(data.test, '1')

	const data2 = lib.qs('http://127.0.0.1/run/?foo=bar&test=1')
	t.is(data2.foo, 'bar')
})

test('fullURL', (t) => {
	let data
	data = lib.fullURL('http://127.0.0.1/run/', { foo: 'bar' })
	t.is(data, 'http://127.0.0.1/run/?foo=bar&test=1')

	data = lib.fullURL('http://127.0.0.1/run/', undefined, false)
	t.is(data, 'http://127.0.0.1/run/')

	data = lib.fullURL('http://127.0.0.1/run/', { foo: 'foo', bar: 'bar' }, true, ['foo'])
	t.is(data, 'http://127.0.0.1/run/?bar=bar&test=1')
})

test('copyObject', (t) => {
	const obj = { a: 1, b: 2, c: undefined }
	const data = lib.copyObject(obj)
	t.not(data, obj)
})

test('clone', (t) => {
	const obj = { a: 1, b: 2, c: 3 }
	const sym = { ...obj, x: Symbol('xxx') }

	let data

	data = lib.clone(sym)
	t.not(data, sym)

	data = lib.clone(obj)
	t.not(data, obj)

	globalThis.structuredClone = undefined
	data = lib.clone(obj)
	t.not(data, obj)
})

test('parseNumber', (t) => {
	t.is(lib.parseNumber('foo'), 'foo')
	t.is(lib.parseNumber('1'), 1)
	t.is(lib.parseNumber('1.123'), 1.123)
	t.is(lib.parseNumber('1.'), '1.')
	t.is(lib.parseNumber(1.123), 1.123)
})

test('parseBoolean', (t) => {
	t.true(lib.parseBoolean('1'))
	t.false(lib.parseBoolean('0'))
	t.true(lib.parseBoolean('true'))
	t.false(lib.parseBoolean('false'))
	t.true(lib.parseBoolean(true))
	t.false(lib.parseBoolean(false))
	t.false(lib.parseBoolean('foo'))
})

test('parses', (t) => {
	t.is(typeof lib.parses('number'), 'function')
	t.is(lib.parses('invalid'), undefined)
})

test('noop', (t) => {
	lib.noop()
	t.pass('noop')
})

test('checkArray', (t) => {
	const data = []
	const other = [1, 2, 3]
	t.true(lib.checkArray(data))
	t.false(lib.checkArray(data, false))
	t.true(lib.checkArray(other, false))
})

test('obj2style', (t) => {
	const data = { color: 'green', width: '100%' }
	t.is(lib.obj2style(data), 'color: green;width: 100%')
})

test('storage', (t) => {
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

test('arr2obj', (t) => {
	const data = [
		{ color: 'green', width: '100%' },
		{ color: 'red', width: '100%' },
	]

	const result = lib.arr2obj('color', data)
	t.is(
		JSON.stringify(result),
		JSON.stringify({
			green: { color: 'green', width: '100%' },
			red: { color: 'red', width: '100%' },
		}),
	)

	t.is(JSON.stringify(lib.arr2obj('xxx', data)), JSON.stringify({}))
	t.is(JSON.stringify(lib.arr2obj('color', result)), JSON.stringify(result))
})

test('setCssVars', (t) => {
	const data = {
		'--color': 'green',
		'--width': '100%',
	}

	lib.setCssVars(data)
	t.pass('setCssVars')
})

test('template', (t) => {
	const templateString = 'My name is ${"user.fullname"}.'
	const templateVariables = { 'user.fullname': 'Teste' }
	const result = lib.template(templateString, templateVariables)
	t.is(result, 'My name is Teste.')
})

test('template options', (t) => {
	const templateString = 'My name is ${"user.fullname"} and I like to eat ${"food"} with water'
	const templateVariables = { 'user.fullname': 'Teste' }
	const options = {
		undefinedReplacement: '__________',
		useFlat: false,
	}
	const result = lib.template(templateString, templateVariables, options)
	t.is(result, 'My name is Teste and I like to eat __________ with water')
})

test('template obj', (t) => {
	const templateString = 'My name is ${"user.fullname"} and I like to eat ${"food"} with water'
	const templateVariables = {
		user: {
			fullname: 'Teste',
		},
	}
	const options = {
		undefinedReplacement: '__________',
	}
	const result = lib.template(templateString, templateVariables, options)
	t.is(result, 'My name is Teste and I like to eat __________ with water')
})

test('template regex', (t) => {
	const templateString = 'My name is ${user.fullname} and I like to eat ${food} with water'
	const templateVariables = {
		food: 'pasta',
		user: {
			fullname: 'Teste',
		},
	}
	const options = {
		regex: /\${([^{}]*?)}/gm,
	}
	const result = lib.template(templateString, templateVariables, options)
	t.is(result, 'My name is Teste and I like to eat pasta with water')
})

test('template no data', (t) => {
	const templateString = undefined
	const templateVariables = {
		user: {
			fullname: 'Teste',
		},
	}
	const options = {
		regex: /\${([^{}]*?)}/gm,
	}
	const result = lib.template(templateString, templateVariables, options)
	t.is(result, '')
})

test('uuid / rnd', (t) => {
	lib.rnd()
	lib.uuid(false)
	// globalThis.crypto = undefined
	lib.uuid()
	t.pass('uuid')
})

test('findRecursive', (t) => {
	const collection = [
		{
			foo: [
				{
					noop: [
						{ id: 1, name: 'a' },
						{ id: 2, name: 'b' },
						{ id: 3, name: 'c' },
					],
				},
			],
		},
		{
			bar: 'baz',
		},
		{
			xxx: ['a', 'b', 'c'],
		},
	]

	const a = lib.findRecursive(collection, 'id', 2)
	const b = lib.findRecursive('test', 'id', 2)
	const c = lib.findRecursive(collection, 'xxx', 'b')
	const d = lib.findRecursive(collection, 'bar', 'baz')
	const e = lib.findRecursive(undefined, 'id', 0)

	t.is(a.name, 'b')
	t.is(b, undefined)
	t.is(c.xxx[0], 'a')
	t.is(d.bar, 'baz')
	t.is(e, undefined)
})

test('form2qs', (t) => {
	const obj = { hello: 'world' }
	const blob = new Blob([JSON.stringify(obj, null, 2)], {
		type: 'application/json',
	})
	const formData = new FormData()
	formData.append('foo', 1)
	formData.append('foo', 2)
	formData.append('bar', 3)
	formData.append('pic', blob, 'test.jpg')
	const qs = lib.form2qs(formData)
	const qs2 = lib.form2qs(formData, false)
	t.is(qs, 'foo=1&foo=2&bar=3&pic=test.jpg')
	t.true(qs2 instanceof globalThis.URLSearchParams)
})

test('getValueFromObject', (t) => {
	const obj = {
		data: {
			user: {
				name: 'John',
				phones: [
					{
						type: 'a',
						number: '+551199999',
					},
					{
						type: 'b',
						number: '+551188888',
					},
				],
			},
			cars: ['onix', 'civic'],
		},
	}
	const r1 = lib.getValueFromObject(obj, 'data.user.name')
	const r2 = lib.getValueFromObject(obj, 'data.cars')
	const r3 = lib.getValueFromObject(obj, 'data.user.age')
	const r4 = lib.getValueFromObject(obj, 'data.cars[1]')
	const r5 = lib.getValueFromObject(obj, 'data.user.phones[0].type')
	const r6 = lib.getValue(undefined, 'data.user.phones[0].type')
	t.is(r1, 'John')
	t.is(r2, obj.data.cars)
	t.is(r3, undefined)
	t.is(r4, 'civic')
	t.is(r5, 'a')
	t.is(r6, undefined)
})

test('isPlainObject', (t) => {
	t.true(lib.isPlainObject({}))
	t.false(lib.isPlainObject([]))
	t.false(lib.isPlainObject(null))
	t.false(lib.isPlainObject(7))
	t.false(lib.isPlainObject('test'))
	t.false(lib.isPlainObject(undefined))
	t.false(lib.isPlainObject(new Date()))
	t.false(lib.isPlainObject(Date))
})

test('removeLink', (t) => {
	const html = 'Clique <a rel="noopenner" target="_blank" href="https://buscacepinter.correios.com.br/app/endereco/index.php">aqui</a>'
	const v = lib.removeLink(html)
	t.is(v, 'Clique aqui')
})

test('debounce', (t) => {
	const clock = sinon.useFakeTimers()
	const stub = sinon.stub()
	const fn = lib.debounce(stub, 1000)

	for (let i = 0; i < 10; i++) {
		clock.tick(500)
		fn()
	}
	t.false(stub.calledOnce)
	clock.tick(1000)
	clock.restore()
	t.true(stub.calledOnce)
})

test('getUrl', (t) => {
	const url = lib.getUrl('https://eu.com.vc/xxx/lib.js')
	t.is(url, 'https://eu.com.vc/xxx')
})

test('kebabify', (t) => {
	const v1 = lib.kebabify('AbcDefG')
	const v2 = lib.kebabify('abcDefG')
	const v3 = lib.kebabify('-abc-DefG')
	const v4 = lib.kebabify('_abc-De_f_G_')
	t.is(v1, 'abc-def-g')
	t.is(v2, 'abc-def-g')
	t.is(v3, 'abc-def-g')
	t.is(v4, 'abc-def-g')
})

test('getProp', (t) => {
	const id = lib.getProp('https://eu.com.vc/lib.js?id=xxx', 'id')
	t.is(id, 'xxx')
})

test('getData', (t) => {
	const data = lib.getData('xxx')
	t.deepEqual(data, { one: 'foo', two: 'bar' })
})

test('createElement', (t) => {
	const element = lib.createElement('div', {
		dataset: {
			test: 'test',
		},
		id: 'divTest',
	})
	t.is(element.dataset.test, 'test')
	t.is(element.id, 'divTest')
})

test('flatter object', (t) => {
	const flat = lib.flattenObject({
		a: {
			b: {
				c: 'foo',
			},
			x: undefined,
			d: 'bar',
		},
	})
	t.deepEqual(flat, { 'a.b.c': 'foo', 'a.x': undefined, 'a.d': 'bar' })
})

test('uniqueWords', (t) => {
	const r = lib.uniqueWords('aaa bbb ccc ', 'aaa   xxx yyy')
	t.is(r, 'aaa bbb ccc xxx yyy')
})

test('uniqueWords only string', (t) => {
	const r = lib.uniqueWords(undefined, 'aaa   xxx yyy', [], {}, 123, true)
	t.is(r, 'aaa xxx yyy')
})
