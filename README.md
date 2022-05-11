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


## License

MIT © [Thiago Lagden](http://github.com/lagden)
