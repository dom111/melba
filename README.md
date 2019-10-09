# melba-toast - A tiny toast library

My focus for making this was to have a minimal toast that can easliy be extended
as necessary. THe styling is currently minimal but that is by design and the aim
would be for users to augment the styles and theme as necessary.

## Installation

```sh
yarn add melba-toast
```

## Usage

```js
import Melba from 'melba-toast';

const toast = new Melba({
    content: 'Testing',
    type: 'error'
});
```

See `src/Melba.js` for additional options that can be passed in.

Be sure to load the styles too:

```css
/* SCSS */
@import '~melba-toast';
```
