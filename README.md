
React Super Styled
==================

![RSS](banner.jpg)

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![js-standard-style](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](http://https://prettier.io/)


### Responsive JSX layouts with [Styled Components](https://www.styled-components.com/)

RSS allows for rapid authoring & styling of your JSX layouts, and improved readability:

* Semantic component and prop naming
* Handy boolean props for common styling rules
* Media breakpoint props for styles, grid, and display (show/hide)
* Flexbox and flex-based 12-column grid
* Spacing "shorthands" for margin, padding
* Customizable theme, breakpoints

Caveats:
1) Not a full-fledged "styling library" (but makes for a great "base" :)
2) Dynamic prop parsing adds some overhead (but plenty fast for most apps :)
3) Untested when rendering server-side (but "should" work ;)


### Installation
```
npm install react-super-styled --save
```
or
```
yarn add react-super-styled
```

Your React project should be using Styled Components as a dependency. If not, [install it](https://www.styled-components.com/docs/basics#installation).


### Usage Example
```
import { Article, Heading, Text } from 'react-super-styled'

function MyArticle({text, title}) {
  return (
    <Article margin="1 *" mdStyles="padding: 10px">
      <Heading h3 center color="firebrick" large>{title}</Heading>
      <Text italic">{text}</Text>
    </Article>
  )
}
```

### Interactive Docs
Try out *React Super Styled* "live" in the [DEMO](https://moarwick.github.io/react-super-styled/). The intent behind *RSS* is to be intuitive and readable. Experiment with all listed props and inspect the results! :)

### Responsive Styles
All *RSS* components accept styling props per each media breakpoint: `styles`, `smStyles`, `mdStyles`, `lgStyles` and `xlStyles`. It's a "mobile-first" approach, so use `styles` as the default (mobile "xs") style, then pass in additional styling into any of the other style props to trigger when those breakpoints are exceeded.

Styles can be passed in as a basic string of CSS, e.g. `color: red; font-size: 32px` or an array of CSS interpolations from Styled Components' `css` helper. Have a look at the demo [source code](https://github.com/moarwick/react-super-styled/blob/master/src/ComponentDemo.js) for usage examples.

### Grid
The `Flex` (container) and `FlexItem` components support all valid Flexbox props, plus a 12-column grid implementation, including media-based columns, offsets, and gutters. As with styles, the responsive grid props are applied in the "mobile-first" order.

Since gutters are optional, negative margins are applied to a `Flex` (row) only if gutter props are present. While `FlexItem` supports gutter props, they should be specified at the `Flex` row level (and will be passed down automatically to all direct `FlexItem` children).

### Spacing Shorthands
Since web layouts involve frequent tweaking of margins and padding, most *RSS* components accept "shorthand" `margin` and `padding` props. The standard CSS syntax is enhanced to interpret pure numbers as "multipliers" of `THEME.SPACER` (10px), and asterisks `*` to skip a given direction altogether.

For instance, `padding="1"` will result in `padding: 10px;`, while `margin="0 2.5 * *"` will result in `margin-top: 0; margin-right: 25px;`. You can mix the units, e.g. `padding="3 15px * *"`, but... you shouldn't! ;)

### Typography
As of `0.4.0`, `Heading` and `Text` no longer apply any explicit font size or weight. Instead, you can specify browser-interpeted sizing, e.g. `small`, `medium` (matches 100%), `large`, `xLarge`, `xxLarge`, as well as relative sizing and weights, e.g. `smaller`, `larger`, `lighter`, `bolder`. Alternatively, size can be set using the `size` prop, which accepts numbers (px) or strings with desired units (px, em). Per "responsive principles", it is recommended that you set a default `font-size` on the `body`, e.g. `100%` (about 16px).

### Theme
*RSS* components rely on a built-in [default theme](https://github.com/moarwick/react-super-styled/blob/master/src/lib/THEME.js). Being a layout-oriented library, the theme is "design neutral" and contains primarily (Bootstrap compatible) breakpoint values.

Should you want to override any of those values, you can pass in your own theme (or a subset thereof) to any *RSS* component directly via the `theme` prop. Using Styled Components' `ThemeProvider` [wrapper](https://www.styled-components.com/docs/advanced#theming) should also work. The passed-in theme will be "extended over" the defaults, so it can be used to override existing values or to add more variables in case you decide to [extend](#extending-styling) any *RSS* components further.

### Extending Styling
Majority of *RSS* components are functional native Styled Components, so alternatively, they can be extended via Styled Components' [extend method](https://www.styled-components.com/docs/basics#extending-styles). For `Heading` and `Flex` you can use the `styled(Component)` approach.

> RSS is intended for building layouts. For heavy structures or components requiring lots of additional styling, it is recommended to create new "raw" styled components. Having said that, the dynamically generated [DEMO](https://moarwick.github.io/react-super-styled/) page is quite complex and 100% *RSS*, yet renders well under 200ms in production.


### Utilities

#### withMedia( [userTheme:Object] )( Component ) ⇒ <code>'xs'|'sm'|'md'|'lg'|'xl'</code>
Component enhancer to supply the current "breakpoint" via prop `media`. Uses the `MEDIA_XS, MEDIA_SM, MEDIA_MD, MEDIA_LG` thresholds in [RSS theme](https://github.com/moarwick/react-super-styled/blob/master/src/lib/THEME.js) to determine the breakpoint -- the `userTheme` argument is optional, supply only if customizing those breakpoints. Typically, just: `export default withMedia()(MyComponent)`.

### Changelog
* See [Releases](https://github.com/moarwick/react-super-styled/releases)
