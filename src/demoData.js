import React from 'react';
import PropTypes from 'prop-types';
import * as Components from './lib/index';

const TYPES = {
  ARRAY: 'Array',
  BOOL: 'Boolean',
  NUMBER: 'Number',
  STRING: 'String',
  STRING_OR_NUMBER: 'String, Number',
  STRING_OR_ARRAY_OF_CSS: 'String, Array (CSS)',
  OBJECT: 'Object',
  NODE: 'React Elem(s)',
  FUNC: 'Function',
  STRING_FLEX_DIR: 'String (row, row-reverse, column, column-reverse)',
  STRING_FLEX_WRAP: 'String (nowrap, wrap, wrap-reverse)',
  STRING_JUSTIFY_CONTENT: 'String (flex-start, flex-end, center, space-between, space-around)',
  STRING_ALIGN_ITEMS: 'String (stretch, center, flex-start, flex-end, baseline)',
  STRING_ALIGN_CONTENT:
    'String (stretch, center, flex-start, flex-end, space-between, space-around)'
};

const PROP_TYPES = {
  children: TYPES.NODE,
  innerRef: TYPES.FUNC,
  theme: TYPES.OBJECT,

  hide: TYPES.BOOL,
  smHide: TYPES.BOOL,
  mdHide: TYPES.BOOL,
  lgHide: TYPES.BOOL,

  show: TYPES.BOOL,
  smShow: TYPES.BOOL,
  mdShow: TYPES.BOOL,
  lgShow: TYPES.BOOL,

  showInline: TYPES.BOOL,
  smShowInline: TYPES.BOOL,
  mdShowInline: TYPES.BOOL,
  lgShowInline: TYPES.BOOL,

  showInlineBlock: TYPES.BOOL,
  smShowInlineBlock: TYPES.BOOL,
  mdShowInlineBlock: TYPES.BOOL,
  lgShowInlineBlock: TYPES.BOOL,

  container: TYPES.BOOL,

  margin: TYPES.STRING_OR_NUMBER,
  padding: TYPES.STRING_OR_NUMBER,

  block: TYPES.BOOL,
  inline: TYPES.BOOL,
  inlineBlock: TYPES.BOOL,

  color: TYPES.STRING,
  lineHeight: TYPES.STRING_OR_NUMBER,

  italic: TYPES.BOOL,
  roman: TYPES.BOOL,
  underline: TYPES.BOOL,
  light: TYPES.BOOL,
  normal: TYPES.BOOL,
  bold: TYPES.BOOL,
  small: TYPES.BOOL,
  base: TYPES.BOOL,
  medium: TYPES.BOOL,
  large: TYPES.BOOL,
  xLarge: TYPES.BOOL,
  xxLarge: TYPES.BOOL,

  left: TYPES.BOOL,
  center: TYPES.BOOL,
  right: TYPES.BOOL,

  h1: TYPES.BOOL,
  h2: TYPES.BOOL,
  h3: TYPES.BOOL,
  h4: TYPES.BOOL,

  flexDirection: TYPES.STRING,
  flexWrap: TYPES.STRING,
  justifyContent: TYPES.STRING,
  alignItems: TYPES.STRING,
  alignContent: TYPES.STRING,

  alignSelf: TYPES.STRING,
  flex: TYPES.STRING,
  flexBasis: TYPES.STRING,
  flexGrow: TYPES.NUMBER,
  flexShrink: TYPES.NUMBER,
  order: TYPES.NUMBER,

  gutter: TYPES.NUMBER,
  smGutter: TYPES.NUMBER,
  mdGutter: TYPES.NUMBER,
  lgGutter: TYPES.NUMBER,

  col: TYPES.NUMBER,
  smCol: TYPES.NUMBER,
  mdCol: TYPES.NUMBER,
  lgCol: TYPES.NUMBER,

  offset: TYPES.NUMBER,
  smOffset: TYPES.NUMBER,
  mdOffset: TYPES.NUMBER,
  lgOffset: TYPES.NUMBER,

  styles: TYPES.STRING_OR_ARRAY_OF_CSS,
  smStyles: TYPES.STRING_OR_ARRAY_OF_CSS,
  mdStyles: TYPES.STRING_OR_ARRAY_OF_CSS,
  lgStyles: TYPES.STRING_OR_ARRAY_OF_CSS,

  borderStyle: TYPES.STRING,
  colorTo: TYPES.STRING,
  height: TYPES.STRING_OR_NUMBER
};

/*
<Display mdHide>I'm going undercover below MD.</Display>
<Display mdShow>Above MD, I come out of the closet!</Display>
<Display smShow>SM stands for "small size".</Display>
*/

/**
 * Code examples and meta
 */
const DEMO = {
  BLOCK: {
    DESCRIPTION: "Block wrapper, renders DIV tag. The 'container' prop is akin to Bootstrap.",
    CODE: `
<Block>
	<Block padding="2" center styles='background-color: orange;'>
	  My DIV gave me padding, alignment, and... jaundice :|
	</Block>
	<Block margin="2 10 * 10" styles='background-color: gold;'>
	  My DIV has neat "shorthand" margins applied.
	</Block>
</Block>`
  },

  ARTICLE: {
    DESCRIPTION: 'Block variant, renders ARTICLE tag.',
    CODE: `
<Article center styles='background-color: orange;'>
	I'm just like a <em>Block</em>, only more "semantic", ok?
</Article>`
  },

  SECTION: {
    DESCRIPTION: 'Block variant, renders SECTION tag.',
    CODE: `
<Section center styles='background-color: orange;'>
	I'm just like a <em>Block</em>, only more "semantic", ok?
</Section>`
  },

  WRAP: {
    DESCRIPTION: (
      <span>
        Non-block wrapper, renders SPAN tag, as <code>inline</code> (default),{' '}
        <code>inline-block</code>, or <code>block</code>.
      </span>
    ),
    EXTRA_SCOPE: ['Block'],
    CODE: `
<Block styles='background-color: gold;'>
	I will build a <Wrap bold medium>GREAT</Wrap> wall, and <Wrap underline>nobody</Wrap> builds walls better than me! 
	<Wrap color="gray" italic margin="* * * 1">– Donald Trump</Wrap>
</Block>`
  },

  FLEX: {
    DESCRIPTION: (
      <span>
        Flex "container", renders DIV tag. Supports standard flex props, plus props for
        media-enabled 12-column grid. Defaults to&nbsp;
        <code>flexWrap:'wrap'</code>.
      </span>
    ),
    EXTRA_SCOPE: ['Text'],
    CODE: `
<Flex justifyContent="center" alignItems="center" styles="height: 60px;">
	<Text color="gold">By gosh, I'm centered, even vertically!</Text>
</Flex>`
  },

  FLEXITEM: {
    DESCRIPTION: (
      <span>
        Flex "item" wrapper, renders DIV tag. Supports standard flex props, plus props for
        media-enabled 12-column grid (gutters are typically passed down by <code>Flex</code>).
      </span>
    ),
    EXTRA_SCOPE: ['Flex'],
    CODE: `
<Flex>
	<FlexItem col={4} mdCol={4} padding="1" styles="background-color: gold">
	  4 col (xs) → 4 col (md)
	</FlexItem>
	<FlexItem col={8} mdCol={4} padding="1" styles="background-color: orange">
		8 col (xs) → 4 col (md)
	</FlexItem>
	<FlexItem col={12} mdCol={4} padding="1" styles="background-color: firebrick">
		12 col (xs) → 4 col (md)
	</FlexItem>

	<FlexItem offset={2} col={8} padding="1" styles="background-color: #999">
	  2 col offset, 8 col
	</FlexItem>

	<FlexItem col={8} gutter={1} padding="1" styles="background-color: orange">
		8 col - 10px gutter
	</FlexItem>
	<FlexItem col={4} gutter={1} padding="1" styles="background-color: firebrick">
		8 col - 10px gutter
	</FlexItem>
</Flex>`
  },

  HEADING: {
    DESCRIPTION: 'Renders H1, H2, H3, or H4 tag.',
    CODE: `
<Heading h1 center color='gold' margin={0} xLarge>
	Super Styled
</Heading>`
  },

  TEXT: {
    DESCRIPTION: 'Text paragraph, renders P tag.',
    CODE: `
<Text color='gold' center italic medium>
	Pack my box with five dozen liquor jugs. What am I?
</Text>`
  },

  DISPLAY: {
    DESCRIPTION: 'Wrapper to show or hide children based on media breakpoints. Renders SPAN tag.',
    EXTRA_SCOPE: ['Wrap'],
    CODE: `
<Wrap block color="gold" padding="1">
  <Display hide>HELLO WORLD</Display>
</Wrap>`
  },

  RULE: {
    DESCRIPTION: 'A "smarter" HR, just for fun. Renders DIV tag.',
    EXTRA_SCOPE: ['Wrap'],
    CODE: `
<Wrap block color="gold" padding="1">
	dotted
	<Rule borderStyle="dotted" color="gold" margin="1 * 2"/>
	
	dashed
	<Rule borderStyle="dashed" color="orange" height={4} margin="1 * 2"/>
		
	gradient
	<Rule color="firebrick" colorTo="gold" height={10} margin="1 * *"/>
</Wrap>`
  }
};

/**
 * Deliver component's propTypes as a list of [propName, propType] value pairs
 */
function getPropTypes(Component) {
  return Object.keys(Component.propTypes || {}).map(propName => [
    propName,
    PROP_TYPES[propName] || '???'
  ]);
}

/**
 * Deliver scope object, as required by React Live's LiveProvider
 * Always include the name'd component, adding any "EXTRA" components if specified in DEMO meta
 */
function getScopeForReactLive(name) {
  const baseScope = { [name]: Components[name] };
  return (DEMO[name.toUpperCase()].EXTRA_SCOPE || []).reduce(
    (accum, compName) => ({ ...accum, [compName]: Components[compName] }),
    baseScope
  );
}

/**
 * Deliver a data object for a given ComponentDemo component
 */
function getDemoComponentData(name) {
  const key = name.toUpperCase();

  if (!DEMO[key]) return null;

  const Component = Components[name];

  return {
    code: DEMO[key].CODE.trim(),
    name,
    description: DEMO[key].DESCRIPTION,
    propTypesList: getPropTypes(Component),
    scope: getScopeForReactLive(name)
  };
}

export default {
  WRAPPERS: ['Block', 'Article', 'Section', 'Wrap'].map(name => getDemoComponentData(name)),
  TYPOGRAPHY: ['Heading', 'Text'].map(name => getDemoComponentData(name)),
  GRID: ['Flex', 'FlexItem'].map(name => getDemoComponentData(name)),
  MISC: ['Display', 'Rule'].map(name => getDemoComponentData(name))
};
