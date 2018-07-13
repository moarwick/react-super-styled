
React Super Styled
==================

![RSS](banner.jpg)

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![js-standard-style](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](http://https://prettier.io/)

### Responsive JSX layouts with [Styled Components](https://www.styled-components.com/)

> Try the [DEMO](https://moarwick.github.io/react-super-styled/)

RSS is a small React component library which aims to accelerate authoring of JSX layouts and to improve their readability:

* Semantic component and prop naming
* Handy boolean props for common styling rules
* Media breakpoint support for styles, grid, and display (show/hide)
* Flexbox and flex-based grid (arbitrary columns)
* Spacing "shorthands" for margin, padding
* Customizable theme, breakpoints

> Some Breaking "improvements" in v0.5.0, but well worth it :)

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
import styled, { css } from 'styled-components';
import { Article, Heading, Text } from 'react-super-styled'

function MyArticle({text, title}) {
  return (
    <Article margin="1rem 0" styles={{ md: css`padding: 2rem` }}>
      <Heading h3 center color="firebrick" large>{title}</Heading>
      <Text italic">{text}</Text>
    </Article>
  )
}
```

### Interactive Docs
Try out *React Super Styled* "live" in the [DEMO](https://moarwick.github.io/react-super-styled/). The intent behind *RSS* is to be intuitive and readable. Experiment with all listed props and inspect the results! :)

> RSS is intended for building layouts, proritizing dev speed and code readability. Dynamic prop parsing adds some "overhead". The library may be inappropriate for complex components requiring lots of custom styling, ultra dense layouts, tables, or wherever maximum render performance is critical. Don't build Reddit with it! :) 


### Responsive
Nearly all *RSS* components accept a `style` prop, with responsive support. Styles can be passed in as a basic string of CSS, e.g. `"color: red; font-size: 2rem"` or an array of CSS interpolations from Styled Components' `css` helper. To specify styles per breakpoint, pass in an object with any of the following supported breakpoint keys: 

```{ xs: '...', sm: '...', md: '...', lg: '...', xl: '...' }```


### Grid
The `Flex` (container) and `FlexItem` components support all valid Flexbox props, plus an arbitrary-sized grid implementation. 

`FlexItem` supports `col` and an optional `offset`, expecting width values as decimal percentages `0 - 1`. For instance, a third of a 12-column grid, offset to the center: 

```
<FlexItem col={ 4/12 } offset={ 4/12 }>
    Column Content
</FlexItem>
```

`Flex` accepts an optional `gutter`, which is passed down to any direct `FlexItem` children. Gutters are specified in `rems` (default) or other valid units, e.g. `px`. If specified, negative margins are applied to the `Flex` container to ensure flush alignment of the outer `FlexItem` columns with the container.

As with styles, the grid props will also accept object values, per breakpoint:

```
<FlexItem col={{ xs: 12/12, md: 6/12 }} offset={{ xs: 0, md: 3/12 }}>
    Column Content
</FlexItem>
```

### Spacing Shorthands
Web layouts involve frequent tweaking of margins and padding, so most *RSS* components accept "shorthand" `margin` and `padding` props. Passing in numbers defaults to `rem` units.


### Typography
The *RSS* theme does not come with any predefined font sizing. You can specify browser-interpreted sizing, e.g. `small`, `medium` (matches 100%), `large`, `xLarge`, `xxLarge`, as well as relative sizing & weights, e.g. `smaller`, `larger`, `lighter`, `bolder`. Explicit sizing can be set via the `size` prop, which accepts numbers (`rem`) or strings with any valid units. 

Per "best practices", it is recommended to use `rem`s, at least for typography. Setting following resets on your document tends to work well, establishing `1rem` as `10px`:

```
html { font-size: 62.5%; }   // 1rem
body { font-size: 1.4rem; }  // ~14px
```

### Theme
*RSS* components rely on a built-in [default theme](https://github.com/moarwick/react-super-styled/blob/master/src/lib/THEME.js). Being a layout-oriented library, the theme is "design neutral" and contains primarily (Bootstrap compatible) breakpoint values.

Should you want to override any of those values, you can pass in your own theme (or a subset thereof) to any *RSS* component directly via the `theme` prop. Using Styled Components' `ThemeProvider` [wrapper](https://www.styled-components.com/docs/advanced#theming) should also work. The passed-in theme will be "extended over" the defaults, so it can be used to override existing values or to add more variables in case you decide to [extend](#extending-styling) any *RSS* components further.


### Extending Styling
Majority of *RSS* components are functional native Styled Components, so alternatively, they can be extended via Styled Components' [extend method](https://www.styled-components.com/docs/basics#extending-styles). For `Heading` and `Flex` you can use the `styled(Component)` approach.


### Utilities

#### withMedia( Component, [userTheme:Object] ) ⇒ <code>'xs'|'sm'|'md'|'lg'|'xl'</code>
Enhancer HOC to supply the current "breakpoint" via prop `media`. Uses the `MEDIA_SM, MEDIA_MD, MEDIA_LG, MEDIA_XL` thresholds in the [theme](https://github.com/moarwick/react-super-styled/blob/master/src/lib/THEME.js) to determine the breakpoint -- the `userTheme` argument is optional, supply only if customizing those breakpoints.


### Changelog
* See [Releases](https://github.com/moarwick/react-super-styled/releases)
