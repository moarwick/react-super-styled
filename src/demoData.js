import React from 'react';
import * as Components from './lib/index';

const TYPES = {
  ARRAY: 'Array',
  BOOL: 'Boolean',
  BOOL_OR_NUMBER: 'Boolean, Number',
  BOOL_OR_STRING: 'Boolean, String',
  FUNC: 'Function',
  NODE: 'React Elem(s)',
  NUMBER: 'Number',
  OBJECT: 'Object',
  STRING: 'String',
  STRING_OR_NUMBER: 'String, Number',
  STRING_OR_ARRAY_OF_CSS: 'String, Array (css)',
};

const PROP_TYPES = {
  children: TYPES.NODE,
  innerRef: TYPES.FUNC,
  theme: TYPES.OBJECT,

  hide: TYPES.BOOL,
  smHide: TYPES.BOOL,
  mdHide: TYPES.BOOL,
  lgHide: TYPES.BOOL,
  xlHide: TYPES.BOOL,

  show: TYPES.BOOL_OR_STRING,
  smShow: TYPES.BOOL_OR_STRING,
  mdShow: TYPES.BOOL_OR_STRING,
  lgShow: TYPES.BOOL_OR_STRING,
  xlShow: TYPES.BOOL_OR_STRING,

  container: TYPES.BOOL_OR_NUMBER,

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

  xSmall: TYPES.BOOL,
  small: TYPES.BOOL,
  base: TYPES.BOOL,
  medium: TYPES.BOOL,
  large: TYPES.BOOL,
  xLarge: TYPES.BOOL,

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
  xlGutter: TYPES.NUMBER,

  col: TYPES.NUMBER,
  smCol: TYPES.NUMBER,
  mdCol: TYPES.NUMBER,
  lgCol: TYPES.NUMBER,
  xlCol: TYPES.NUMBER,

  offset: TYPES.NUMBER,
  smOffset: TYPES.NUMBER,
  mdOffset: TYPES.NUMBER,
  lgOffset: TYPES.NUMBER,
  xlOffset: TYPES.NUMBER,

  styles: TYPES.STRING_OR_ARRAY_OF_CSS,
  smStyles: TYPES.STRING_OR_ARRAY_OF_CSS,
  mdStyles: TYPES.STRING_OR_ARRAY_OF_CSS,
  lgStyles: TYPES.STRING_OR_ARRAY_OF_CSS,
  xlStyles: TYPES.STRING_OR_ARRAY_OF_CSS,

  borderStyle: TYPES.STRING,
  colorTo: TYPES.STRING,
  height: TYPES.STRING_OR_NUMBER,
};

/**
 * Code examples and meta
 */
const DEMO = {
  BLOCK: {
    DESCRIPTION: 'Block wrapper, renders DIV tag.',
    CODE: `
<Block 
  center
  margin="2 20 * 2" 
  padding="1"
  styles='background-color: orange; border: 2px solid white'
>
  I'm using margins & padding "shorthands".
</Block>`,
  },

  SECTION: {
    DESCRIPTION: 'Block variant, renders SECTION tag.',
    CODE: `
<Section 
  padding="1"
  styles='background-color: firebrick'
  smStyles='background-color: orangered'
  mdStyles='background-color: orange'
  lgStyles='background-color: gold'
>
	Watch me change styles at different breakpoints!
</Section>`,
  },

  ARTICLE: {
    DESCRIPTION: 'Block variant, renders ARTICLE tag.',
    CODE: `
<Article center padding="1" styles='background-color: gold'>
	I'm also just like <em>Block</em>, but more "semantic"  ¯\\_(ツ)_/¯
</Article>`,
  },

  SPAN: {
    DESCRIPTION: <span>SPAN wrapper, supports a wide range of display and typography props.</span>,
    EXTRA_SCOPE: ['Block'],
    CODE: `
<Block padding="1" styles='background-color: gold'>
	I will build a <Span bold medium>GREAT</Span> wall, 
	and <Span underline>nobody</Span> builds walls better than me! 
	<Span color="olive" italic margin="* * * 1">– D. Trump</Span>
</Block>`,
  },

  FLEX: {
    DESCRIPTION: (
      <span>
        Flex "container", renders DIV tag. Supports standard flex props, plus props for
        media-enabled 12-column grid. Defaults to&nbsp;
        <code>'wrap'</code>.
      </span>
    ),
    EXTRA_SCOPE: ['Text'],
    CODE: `
<Flex justifyContent="center" alignItems="center" styles="height: 60px">
	<Text color="gold">By gosh, I'm centered, even vertically!</Text>
</Flex>`,
  },

  FLEXITEM: {
    DESCRIPTION: (
      <span>
        Flex "item" wrapper, renders DIV tag. Supports standard flex props, plus props for
        media-enabled 12-column grid (gutters are typically passed down by <code>Flex</code>).
      </span>
    ),
    EXTRA_SCOPE: ['Block', 'Flex'],
    CODE: `
<Block>
  <Flex>
    <FlexItem col={4} lgCol={4} padding="1" styles="background-color: gold">
      4 col (xs) → 4 col (lg)
    </FlexItem>
    <FlexItem col={8} lgCol={4} padding="1" styles="background-color: orange">
      8 col (xs) → 4 col (lg)
    </FlexItem>
    <FlexItem col={12} lgCol={4} padding="1" styles="background-color: firebrick">
      12 col (xs) → 4 col (lg)
    </FlexItem>
  </Flex>
  
  <Flex margin="1 *">
    <FlexItem 
      col={12} 
      lgOffset={2} lgCol={8}
      padding="1" 
      styles="background-color: #999"
    >  
      12 col (xs) → 2 col offset, 8 col (lg)
    </FlexItem>
	</Flex>
	
  <Flex gutter={10}>
    <FlexItem col={8} padding="1" styles="background-color: orange">
      8 col - 10px gutter
    </FlexItem>
    <FlexItem col={4} padding="1" styles="background-color: firebrick">
      4 col - 10px gutter
    </FlexItem>
	</Flex>
</Block>`,
  },

  HEADING: {
    DESCRIPTION: 'Renders H1, H2, H3, or H4 tag.',
    CODE: `
<Heading h1 center color='gold' margin={0} normal xLarge>
	Super Styled
</Heading>`,
  },

  TEXT: {
    DESCRIPTION: 'Text paragraph, renders P tag.',
    CODE: `
<Text color='gold' center italic medium>
	Pack my box with five dozen liquor jugs.
</Text>`,
  },

  DISPLAY: {
    DESCRIPTION: 'Wrapper to show or hide children based on media breakpoints. Renders SPAN tag.',
    EXTRA_SCOPE: ['Span'],
    CODE: `
<Span block color="gold" padding="1">
  <Display lgHide>I'm shown as "block" by default, up until LG.</Display>
  <Display mdShow="inline">I appear at MD as "inline".</Display>
  <Display mdShow="inline"> #MeToo!</Display>
  <Display smHide lgShow>See me go hide at SM, back at LG!</Display>
</Span>`,
  },

  RULE: {
    DESCRIPTION: 'A "smarter" HR, just for fun. Apply border styles or gradients. Renders DIV tag.',
    EXTRA_SCOPE: ['Span'],
    CODE: `
<Span block color="gold" padding="1">
	dotted
	<Rule borderStyle="dotted" color="gold" margin="1 * 2"/>
	
	dashed
	<Rule borderStyle="dashed" color="orange" height={4} margin="1 * 2"/>
		
	gradient
	<Rule color="firebrick" colorTo="gold" height={10} margin="1 * *"/>
</Span>`,
  },
};

/**
 * Deliver component's propTypes as a list of [propName, propType] value pairs
 */
function getPropTypes(Component) {
  return Object.keys(Component.propTypes || {}).map(propName => [
    propName,
    PROP_TYPES[propName] || '???',
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
    scope: getScopeForReactLive(name),
  };
}

export default {
  WRAPPERS: ['Block', 'Section', 'Article', 'Span'].map(name => getDemoComponentData(name)),
  TYPOGRAPHY: ['Heading', 'Text'].map(name => getDemoComponentData(name)),
  GRID: ['Flex', 'FlexItem'].map(name => getDemoComponentData(name)),
  MISC: ['Display', 'Rule'].map(name => getDemoComponentData(name)),
};
