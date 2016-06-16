# stc-typescript

TypeScript transpile for stc

## Install

```sh
npm install stc-typescript
```

## How to use

```js
// stc.config.js
var typescript = require('stc-typescript');

stc.transpile({
  typescript: {plugin: typescript, include: /\.ts$/, options: {}}
});

```
