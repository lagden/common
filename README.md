# Common

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/common.svg
[npm]:             https://www.npmjs.com/package/@tadashi/common
[ci-img]:          https://github.com/lagden/common/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/common/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/common/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/common?branch=main
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo

-----

Common functions

## Install

```
$ npm i -S @tadashi/common
```


## Usage

```js
import {checkArray} from '@tadashi/common'

const isArray = checkArray([1, 2, 3])
// => true
```

## API

### filterProps(props: object, reserved?: Array<string>): object

Remove as propriedades reservadas do objeto


### params(url?: string): URLSearchParams

Ler a query string de uma url


### qs(): object

Transforma a query string em objeto


### fullURL(endpoint: string, data?: object, useParams?: boolean): string

Gera uma url com a qs + data-*


### copyObject(obj: object): object

Clona um objeto evitando referência via JSON


### clone(obj: object): object

Clona um objeto evitando referência via structuredClone


### parseNumber(v: any): Type<number | any>

Converte o valor para número


### parseBoolean(v: any, force?: boolean): Type<boolean | any>

Converte o valor para boolean


### parses(parse: string): Type<function | void>

Seleciona um parser


### noop(): void

Evita problemas com eslint `unused`


### checkArray(data: any, empty?: boolean): boolean

Verifica se a variável é um Array


### obj2style(data: object): string

Converte o objeto em string separado por `;`


### setStorage(k: string, value: string, type?: string): void

Define o dado no localStorage/sessionStorage


### getStorage(k: string, type?: string): Type<string | void>

Pega o dado definido no localStorage/sessionStorage


### removeStorage(k: string, type?: string): void

Remove dado do localStorage/sessionStorage


### arr2obj(key: string, collection?: Array<object>): object

Converte a coleção em objeto


### setCssVars(data: object): void

Define css vars no root


### template(templateString: string, templateVars: object): string

Preenche o template definido


### uuid(removeDash?: boolean): string

Gerador de id aleatório


### findRecursive(collection: Array<object>, key: string, value: string|number): object

Encontra um objeto no array


### form2qs(data: FormData): string

Tranforma o formulário em query-string


### removeLink(data: string): string

Remove a tag `<a>` da string


### debounce(callback: function, wait: number): function

Atrasa a função dada até que o tempo de espera declarado em milissegundos tenha passado desde a última vez que esta função de foi chamada.


### dirname(value?: string): object

Retorna um objeto com o caminho e a url de um arquivo.


### getUrl(value?: string): string

Retorna a url de um arquivo.


---


## License

MIT © [Thiago Lagden](http://github.com/lagden)
