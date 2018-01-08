
React Super Styled
==================

[![js-standard-style](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](http://https://prettier.io/)


### Responsive JSX layouts with Styled Components

A small collection of React "convenience components" to render common HTML "layout" elements when working with [Styled Components](https://www.styled-components.com/).

* Quickly author HTML & CSS the "React Way"
* Semantic component and prop naming
* Handy built-in props for common styling rules
* Flexbox and flex-based 12-column grid
* Media breakpoint props for columns, styles, and display (show/hide)
* Extensible theme vars
* Spacing "shorthands" for margin, pagging, gutters

Caveats:
1) Not a full-fledged styling "framework"
2) Not performance-oriented (since it generates styling dynamically, but probably fine for most use-cases)


### Interactive Demo
Try out all *Super Styled* components "live" in the [DEMO](https://moarwick.github.io/react-super-styled/)


### Installation
```
npm install react-super-styled --save
```
or
```
yarn add react-super-styled
```

Your React project should be using Styled Components as a dependency. If not, [install it](https://www.styled-components.com/docs/basics#installation).

### Usage
```
import { Block, Heading, Text } from 'react-super-styled'

function ContentBlock({text, title}) {
  return (
    <Block center padding="1 2">
      <Heading h3 xLarge>{title}</Heading>
      <Text bold italic>{text}</Text>
    </Block>
  )
}
```

### Theme
The *SS* components rely on its built-in [default theme](https://github.com/moarwick/react-super-styled/blob/master/src/lib/THEME.js). You can pass in your own theme object (or a subset thereof) via the `theme` prop, and it will be extended over the defaults. You can pass it in directly, or using Styled Components' `ThemeProvider` [wrapper](https://www.styled-components.com/docs/advanced#theming).

### Spacing Shorthands
When passing in `margin`, `padding`, or `FlexItem`'s column props, a special "shorthand" syntax understands numbers to be multiplied by the `THEME.SPACER` (10px). 

So, `padding="1"` will result in `padding: 10px;` Dash will skip a given rule (preserve current styling), so `margin="0 2 - -"` will result in `margin-top: 0; margin-right: 20px;`

### Extending Styles
Each *SS* component will accept additional CSS through any of the styling props: `styles`, `mdStyles`, `smStyles`, and/or `xsStyles`. You can pass in a string of CSS text or an array of interpolation from Styled Components' `css` helper.

Of course, you can also use Styled Components' [extend method](https://www.styled-components.com/docs/basics#extending-styles).


### Changelog
**Ver 0.0.1**
* Experimental "POC" version, up on NPM
