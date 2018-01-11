
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
* Spacing "shorthands" for margin, padding

Caveats:
1) Not a full-fledged styling "framework"
2) Not performance-oriented (plenty fast for most client-side rendered apps, untested server-side)


### Interactive Demo
Try out all *React Super Styled* components "live" in the [DEMO](https://moarwick.github.io/react-super-styled/). The docs here are light, but you can experiment with all listed props and see the changes :)


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
import { Article, Heading, Text } from 'react-super-styled'

function MyArticle({text, title}) {
  return (
    <Article center padding="1 2">
      <Heading h3 center large>{title}</Heading>
      <Text bold italic>{text}</Text>
    </Article>
  )
}
```

### Theme
*RSS* components rely on a built-in [default theme](https://github.com/moarwick/react-super-styled/blob/master/src/lib/THEME.js). It is used to define media breakpoints, a shorthand [spacer multiplier](#spacing-shorthands), plus font weights & sizing (for typography props). This being a layout-oriented library, the theme avoids concerning itself with colors or other design-oriented values.

You can pass in your own theme object (or a subset thereof) via the `theme` prop, and it will be "extended over" the defaults. You can pass it in directly, or using Styled Components' `ThemeProvider` [wrapper](https://www.styled-components.com/docs/advanced#theming), to override existing values or to add more variables in case you decide to [extend](#extending-styling) any *RSS* components further.

### Responsive Styles
All *RSS* components accept styling props per each media breakpoint (defined in the theme): `styles`, `smStyles`, `mdStyles` and `lgStyles`. It's a Bootstrap-style "mobile-first" approach, so think of it in that order -- use `styles` as the default style, which applies at the smallest widths; then pass in styling into any of the other style props to trigger when those breakpoints are exceeded.

Styles can be passed in as a basic string of CSS, e.g. `color: red; font-size: 32px` or an array of CSS interpolations from Styled Components' `css` helper. Have a look at the demo [source code](https://github.com/moarwick/react-super-styled/blob/master/src/ComponentDemo.js) for usage examples.

### Extending Styling
Majority of *RSS* components are functional native Styled Components, so alternatively, they can be extended via Styled Components' [extend method](https://www.styled-components.com/docs/basics#extending-styles). The exceptions currently are `Heading` and `Flex` which would need to use the `styled(Comp)` approach.

*NOTE: The `styles` props, and *RSS* in general, are intended for building layouts. They are great for handling responsive styling in your layouts or minor styling enhancements. However, there is some overhead in parsing all the props, so you should probably create "raw" styled components whenever building actual UI widgets or more custom or complex components.*

### Grid
The `Flex` (container) and `FlexItem` components implement all valid Flexbox props, plus a 12-column grid implementation, including media-based columns, offsets, and gutters. As with styles, the responsive grid props are applied in the "mobile-first" order.

Since gutters are optional, negative margins are applied to a `Flex` (row) only if any gutter props are present. While `FlexItem` supports gutter props, they should be specified at the `Flex` row level (and will be passed down automatically to all direct `FlexItem` children). See the [DEMO](https://moarwick.github.io/react-super-styled/) for examples.

### Spacing Shorthands
Since much about web work involves massaging of margins and padding, most *RSS* components accept `margin` and `padding` props. The standard CSS "shorthand" syntax is enhanced to interpret pure numbers as "multipliers" for `THEME.SPACER` (10px), and asterisks `*` to skip a given direction altogether.

For instance, `padding="1"` will result in `padding: 10px;` all around, while `margin="0 2 * *"` will result in `margin-top: 0; margin-right: 20px;`. You can mix the units, e.g. `padding="3 15px * *"` would result in `padding-top: 30px; padding-right: 15px`, but.. maybe keep it consistent? ;)

### Changelog
**Ver 0.0.1**
* Experimental "POC" version, up on NPM

**Ver 0.1.0**
* Evaluation version, now used on projects
* Much improved grid implementation in `Flex`, `FlexItem` (breaking changes)
* Updated media breakpoint logic for styles, `Display` (breaking changes)
* New `container` prop for block wrappers
* New `Article` component
* Switched to `airbnb` style (`standard` is still great!)
* Updated docs & demo
