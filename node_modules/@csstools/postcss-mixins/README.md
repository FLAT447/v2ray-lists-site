# PostCSS Mixins [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][PostCSS]

`npm install @csstools/postcss-mixins --save-dev`

[PostCSS Mixins] lets you use `@mixin` and `@apply` following [CSS Mixins 1].

Several specification aspects of CSS Mixins still need to be settled.  
This plugin is only a partial implementation to avoid conflicts with the final specification.

Unsupported:
- mixin arguments
- `@contents` blocks
- `@result` blocks
- layered `@mixin` declarations
- mixin overrides

```css
@mixin --foo() {
	color: green;
}

.foo {
	@apply --foo;
}

/* becomes */

.foo {
	color: green;
}
```

## Usage

Add [PostCSS Mixins] to your project:

```bash
npm install postcss @csstools/postcss-mixins --save-dev
```

Use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssMixins = require('@csstools/postcss-mixins');

postcss([
	postcssMixins(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```



## Options

### preserve

The `preserve` option determines whether the original notation
is preserved. By default, it is not preserved.

```js
postcssMixins({ preserve: true })
```

```css
@mixin --foo() {
	color: green;
}

.foo {
	@apply --foo;
}

/* becomes */

@mixin --foo() {
	color: green;
}

.foo {
	color: green;
	@apply --foo;
}
```

[cli-url]: https://github.com/csstools/postcss-plugins/actions/workflows/test.yml?query=workflow/test
[css-url]: https://cssdb.org/#mixins
[discord]: https://discord.gg/bUadyRwkJS
[npm-url]: https://www.npmjs.com/package/@csstools/postcss-mixins

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Mixins]: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-mixins
[CSS Mixins 1]: https://drafts.csswg.org/css-mixins/#mixin-rule
