# tf2cost

![npm](https://img.shields.io/npm/v/tf2cost?color=green&label=npm)
[![codecov](https://codecov.io/gh/prenaissance/tf2-utils/branch/master/graph/badge.svg?token=PC6YITRIIN)](https://codecov.io/gh/prenaissance/tf2-utils)
![CI workflow](https://github.com/prenaissance/tf2-utils/actions/workflows/ci.yml/badge.svg)

A package for parsing and converting tf2 currencies

## Installation

- Browse to your project's root directory or initialize a new project with `npm init`.

- Use your favorite package manager to add the package to your project.

  npm: `npm install tf2cost`.

  yarn: `yarn add tf2cost`.

  pnpm: `pnpm add tf2cost`.

## Usage

The default import can be called to instantiate a `TF2Currency` object. It automatically normalizes the input to the highest currencies possible.

```ts
import tf2cost from "tf2cost";
const currency = tf2cost({
  refined: 1,
  reclaimed: 4,
});
console.log(currency.toString()); // "2.33 ref"
console.log(currency.refined); // 2
```

It's also possible to convert to keys & USD, for which it is recommended to setup the values of the config with your own values:

```ts
import tf2cost, { config } from "tf2cost";

config.keyRefinedPrice = 100;
config.keyUSDPrice = 2.0;

const currency = tf2cost({
  refined: 150,
});
console.log(currency.toString()); // "1.5 keys"
console.log(currency.toUSD()); // 3
```

Another feature is the ability to parse string inputs. It supports the following formats:

- `"<number> ref"` (e.g. `1.33 ref`)
- `"<number> key[s]"` (e.g. `1.5 keys`)
- `"<number> key[s][,] <number> ref"` (e.g. `1 key 12.33 ref`, `1.5 keys, 1.33 ref`)

and unsupported formats will throw an error.

```ts
import tf2cost from "tf2cost";
const currency = tf2cost.parse("2 keys, 10 ref");
console.log(currency.toString()); // "2.11 keys"
```

## API

WIP
