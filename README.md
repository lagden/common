# Common

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/common.svg
[npm]:             https://www.npmjs.com/package/@tadashi/common
[ci-img]:          https://github.com/lagden/common/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/common/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/common/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/common?branch=main


---


Common functions

## Instalação

```
$ npm i -S @tadashi/common
```


## Uso

Exemplo um:

```js
import {checkArray} from '@tadashi/common'

const isArray = checkArray([1, 2, 3])
// => true
```

Exemplo dois:

```js
import {checkArray} from '@tadashi/common/src/lib/check-array.js'

const isArray = checkArray([1, 2, 3])
// => true
```

Exemplo três:

```js
import {checkArray} from 'https://unpkg.com/@tadashi/common@{version}/src/lib/check-array.js'

const isArray = checkArray([1, 2, 3])
// => true
```


## API

### DOM

> `getData(id: string): object`

Converte data-* atributos para objeto


> `getProp(url: string, prop?: string): string`

Pega a propriedade da query string


### Parse

> `parseNumber(v: any): Type<number | any>`

Converte o valor para número.


> `parseBoolean(v: any, force?: boolean): Type<boolean | any>`

Converte o valor para boolean.


> `parses(parse: string): Type<function | void>`

Selecione um parser


### Storage

> `getStorage(k: string, type?: string): Type<string | void>`

Retorna o dado definido no localStorage/sessionStorage


> `removeStorage(k: string, type?: string): void`

Remove dado do localStorage/sessionStorage


> `setStorage(k: string, value: string, type?: string): void`

Define o dado no localStorage/sessionStorage


### URL

> `fullURL(endpoint: string, data?: object, useParams?: boolean): string`

Gera uma url com a qs + data-*


> `getURL(value?: string): string`

Retorna a url de um arquivo.


> `params(url?: string): URLSearchParams`

Ler a query string de uma url


> `qs(url?: string): object`

Transforma a query string em objeto


### Outros métodos

> `arr2obj(key: string, collection?: Array<object>): object`

Converte a coleção em objeto


> `checkArray(data: any, empty?: boolean): boolean`

Verifica se a variável é um Array


> `clone(obj: object): object`

Clona um objeto evitando referência via structuredClone


> `copyObject(obj: object): object`

Clona um objeto evitando referência via JSON


> `createElement(element: string, props?: object): HTMLElement`

Cria um elemento para ser adicionado no DOM


> `debounce(callback: function, wait: number): function`

Atrasa a função dada até que o tempo de espera declarado em milissegundos tenha passado desde a última vez que esta função de foi chamada.


> `filterProps(props: object, reserved?: Array<string>): object`

Remove as propriedades reservadas do objeto


> `findRecursive(collection: Array<object>, key: string, value: string|number): object`

Encontra um objeto no array


> `flattenObject(obj: object, delim: string): string`

Nivela o objeto em um único nível


> `form2qs(data: FormData): string`

Tranforma o formulário em query-string


> `kebabify(value?: string): string`

Converte camel/snake case para kebab case.


> `noop(): void`

Evita problemas com eslint `unused`


> `obj2style(data: object): string`

Converte o objeto em string separado por `;`


> `removeLink(data: string): string`

Remove a tag `<a>` da string


> `setCssVars(data: object): void`

Define css vars no root


> `template(templateString: string, templateVars: object, options?: object): string`

Preenche o template definido


> `rnd(removeDash?: boolean): string`  
> Alias `uuid`

Gerador de ID aleatório


> `uniqueWords(...args: string[]): string`

Retorna uma string contendo palavras exclusivas dos argumentos fornecidos


---


## License

MIT © [Thiago Lagden](http://github.com/lagden)
