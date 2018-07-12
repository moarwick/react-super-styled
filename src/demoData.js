import React from 'react';
import { css } from 'styled-components';
import * as Components from './lib/index';

const TYPES = {
  ARRAY: 'Array',
  BOOL: 'Boolean',
  BOOL_OR_NUMBER: 'Boolean, Number',
  BOOL_OR_STRING: 'Boolean, String',
  FUNC: 'Function',
  NODE: 'React Elem(s)',
  NUMBER: 'Number',
  NUMBER_OR_OBJECT: 'Number, Object',
  OBJECT: 'Object',
  STRING: 'String',
  STRING_OR_NUMBER: 'String, Number',
  STRING_OR_ARRAY_OF_CSS: 'String, Array (css)',
  STYLES: 'String, Array (css), Object',
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

  roman: TYPES.BOOL,
  italic: TYPES.BOOL,
  oblique: TYPES.BOOL,
  underline: TYPES.BOOL,

  light: TYPES.BOOL,
  lighter: TYPES.BOOL,
  normal: TYPES.BOOL,
  bold: TYPES.BOOL,
  bolder: TYPES.BOOL,

  xxSmall: TYPES.BOOL,
  xSmall: TYPES.BOOL,
  small: TYPES.BOOL,
  smaller: TYPES.BOOL,
  medium: TYPES.BOOL,
  large: TYPES.BOOL,
  larger: TYPES.BOOL,
  xLarge: TYPES.BOOL,
  xxLarge: TYPES.BOOL,

  size: TYPES.STRING_OR_NUMBER,

  left: TYPES.BOOL,
  center: TYPES.BOOL,
  right: TYPES.BOOL,

  h1: TYPES.BOOL,
  h2: TYPES.BOOL,
  h3: TYPES.BOOL,
  h4: TYPES.BOOL,
  h5: TYPES.BOOL,

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

  gutter: TYPES.NUMBER_OR_OBJECT,
  col: TYPES.NUMBER_OR_OBJECT,
  offset: TYPES.NUMBER_OR_OBJECT,

  styles: TYPES.STYLES,
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
  margin="2rem 1rem" 
  padding={1}
  styles="background-color: orange; border: 2px solid white"
>
  I'm using margin & padding "shorthands".
</Block>`,
  },

  SECTION: {
    DESCRIPTION: 'Block variant, renders SECTION tag.',
    CODE: `
<Section 
  padding={1}
  styles={{
    xs: 'background-color: brown',
    sm: 'background-color: firebrick',
    md: 'background-color: orangered',
    lg: 'background-color: orange',
    xl: 'background-color: gold',
  }}
>
	Watch me change styles at different &lt;&mdash;&gt; breakpoints!
</Section>`,
  },

  ARTICLE: {
    DESCRIPTION: 'Block variant, renders ARTICLE tag.',
    CODE: `
<Article center padding={1} styles='background-color: gold'>
	I'm also just like <em>Block</em>, but more "semantic"  ¯\\_(ツ)_/¯
</Article>`,
  },

  SPAN: {
    DESCRIPTION: <span>SPAN wrapper, allows for typography and display controls.</span>,
    EXTRA_SCOPE: ['Block'],
    CODE: `
<Block padding={1} styles='background-color: gold'>
	I will build a <Span bold large>GREAT</Span> wall, 
	and <Span underline>nobody</Span> builds walls better than me! 
	<Span color="olive" italic margin="0 0 0 1rem">– D. Trump</Span>
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
        media-enabled 12-column grid (gutters are passed down by <code>Flex</code>).
      </span>
    ),
    EXTRA_SCOPE: ['Block', 'Flex'],
    CODE: `
<Block>
  <Flex gutter={10}>
    <FlexItem col={8/12} padding={1} styles="background-color: orange">
      8 col - 10px gutter
    </FlexItem>
    <FlexItem col={4/12} padding={1} styles="background-color: firebrick">
      4 col - 10px gutter
    </FlexItem>
	</Flex>
  
  <Flex margin="1rem 0">
    <FlexItem 
      col={{ xs: 12/12, lg: 8/12 }} 
      offset={{ lg: 2/12 }}
      padding={1} 
      styles="background-color: #999"
    >  
      12 col (xs) → 2 col offset, 8 col (lg)
    </FlexItem>
	</Flex>
	
	<Flex>
    <FlexItem col={{ xs: 4/12, lg: 4/12 }} padding={1} styles="background-color: gold">
      4 col (xs) → 4 col (lg)
    </FlexItem>
    <FlexItem col={{ xs: 8/12, lg: 4/12 }} padding={1} styles="background-color: orange">
      8 col (xs) → 4 col (lg)
    </FlexItem>
    <FlexItem col={{ xs: 12/12, lg: 4/12 }} padding={1} styles="background-color: firebrick">
      12 col (xs) → 4 col (lg)
    </FlexItem>
  </Flex>
</Block>`,
  },

  HEADING: {
    DESCRIPTION: 'Renders H1, H2, H3, H4, or H5 tag.',
    CODE: `
<Heading h2 center color='gold' margin={0} normal underline xxLarge>
	Super Styled
</Heading>`,
  },

  TEXT: {
    DESCRIPTION: 'Text paragraph, renders P tag.',
    CODE: `
<Text color='gold' center italic large>
	Pack my box with five dozen liquor jugs.
</Text>`,
  },

  DISPLAY: {
    DESCRIPTION: 'Wrapper to show or hide children based on media breakpoints. Renders SPAN tag.',
    EXTRA_SCOPE: ['Span'],
    CODE: `
<Span block color="gold" padding={1}>
  <Display hide={{ lg: true }}>I'm shown as "inline" by default, up until LG.</Display>
  <Display show={{ md: 'block' }}>I appear at MD as "block".</Display>
  <Display show={{ md: 'block' }}> #MeToo!</Display>
  <Display hide={{ sm: true }} show={{ xl: true }}>See me go hide at SM, back at XL!</Display>
</Span>`,
  },

  RULE: {
    DESCRIPTION: 'A "smarter" HR, just for fun. Apply border styles or gradients. Renders DIV tag.',
    EXTRA_SCOPE: ['Span'],
    CODE: `
<Span block color="gold" padding={1}>
	dotted
	<Rule borderStyle="dotted" color="gold" margin="1rem 0 2rem"/>
	
	dashed
	<Rule borderStyle="dashed" color="orange" height={0.4} margin="1rem 0 2rem"/>
		
	gradient
	<Rule color="firebrick" colorTo="gold" height={1} margin="1rem 0 0"/>
</Span>`,
  },
};

/**
 * Deliver component's propTypes as a list of [propName, propType] value pairs
 */
function getPropTypes(Component) {
  return Object.keys((Component && Component.propTypes) || {}).map(propName => [
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
