# melba-toast - A tiny toast library

My focus for making this was to have a minimal toast that can easily be extended
as necessary. The styling is currently minimal but that is by design and the aim
would be for users to augment the styles and theme as necessary.

## Installation

```sh
yarn add melba-toast
```

or

```shell
npm i melba-toast
```

## Usage

```js
import Melba from 'melba-toast';

const toast = new Melba({
    content: 'Testing',
    type: 'error'
});
```

See `src/Melba.ts` for additional options that can be passed in.

Be sure to load the styles too:

```scss
/* SCSS */
@import '~melba-toast';
```
