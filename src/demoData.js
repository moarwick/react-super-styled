import React from 'react';
import * as Components from './lib/index';

/**
 * Code examples and meta
 */
const DEMO = {
  BLOCK: {
    DESCRIPTION: 'Block wrapper, renders DIV tag.',
    CODE: `
<Block>
	<Block margin="0 10 2 0" styles='border: 2px solid firebrick;'>
	  My DIV has neat "shorthand" margins applied.
	</Block>
	<Block padding="2 -" center styles='background-color: gold;'>
	  My DIV gave me padding, alignment, and... jaundice :|
	</Block>
</Block>`
  },

  DISPLAY: {
    DESCRIPTION: 'Wrapper to show or hide children based on media breakpoints. Renders SPAN tag.',
    CODE: `
<p>
	Nobody builds walls better than me<Display mdHide>, believe me</Display>!
	<Display mdShowInline>It will be great!</Display> 
</p>`
  },

  FLEX: {
    DESCRIPTION: (
      <span>
        Flex "container", renders DIV tag. Supports standard flex props, defaults to&nbsp;
        <code>flexWrap:'wrap'</code>
        &nbsp;and&nbsp;
        <code>justifyContent:'flex-start'</code>.
      </span>
    ),
    CODE: `
<Flex justifyContent="center" alignItems="center" styles="height: 60px;">
	By gosh, I'm centered, even vertically!
</Flex>`
  },

  FLEXITEM: {
    DESCRIPTION: (
      <span>
        Flex "item" wrapper, renders DIV tag. Supports standard flex props, plus props for
        media-enabled 12-column grid. Syntax supports width, offset and gutter.
      </span>
    ),
    EXTRA_SCOPE: ['Flex'],
    CODE: `
<Flex>
	<FlexItem xsCol="4" mdCol="4" padding="1" styles="background-color: firebrick">
	  4 col (xs) → 4 col (md)
	</FlexItem>
	<FlexItem xsCol="8" mdCol="4" padding="1" styles="background-color: orange">
		8 col (xs) → 4 col (md)
	</FlexItem>
	<FlexItem xsCol="12" mdCol="4" padding="1" styles="background-color: gold">
		12 col (xs) → 4 col (md)
	</FlexItem>
	
	<FlexItem xsCol="2 8" padding="1" styles="background-color: #ddd">
	  2 col offset, 8 col
	</FlexItem>
	
	<FlexItem xsCol="8-1" padding="1" styles="background-color: firebrick">
		8 col - 10px gutter
	</FlexItem>
	<FlexItem xsCol="4-1" padding="1" styles="background-color: orange">
		8 col - 10px gutter
	</FlexItem>
</Flex>`
  },

  HEADING: {
    DESCRIPTION: 'Renders H1, H2, H3, or H4 tag.',
    CODE: `
<Heading h1 center xLarge color='firebrick' margin="0">
	Story Time
</Heading>`
  },

  RULE: {
    DESCRIPTION: 'A "smarter" HR, just for fun. Renders DIV tag.',
    CODE: `
<span>
	Dotted
	<Rule borderStyle="dotted" margin="- - 2"/>
	
	Dashed
	<Rule borderStyle="dashed" color="gray" height={4} margin="- - 2"/>
		
	Gradient
	<Rule color="purple" colorTo="gold" height={10}/>
</span>`
  },

  SECTION: {
    DESCRIPTION: 'Block wrapper, renders SECTION tag.',
    CODE: `
<Section center styles='border: 2px solid firebrick;'>
	<p>I'm just like a <em>DIV</em>, only more "semantic", ok?</p>
</Section>`
  },

  TEXT: {
    DESCRIPTION: 'Text paragraph, renders P tag.',
    CODE: `
<Text medium right>
	Pack my box with five dozen liquor jugs. What am I?
</Text>`
  },

  WRAP: {
    DESCRIPTION: 'Non-block wrapper, renders SPAN tag, as inline (default) or inline-block.',
    EXTRA_SCOPE: ['Block'],
    CODE: `
<Block>
	I will build a <Wrap bold medium>GREAT</Wrap> wall, and nobody builds walls better than me! 
	<Wrap color="gray" italic margin="- - - 1">– Donald Trump</Wrap>
</Block>`
  }
};

/**
 * Deliver names of component's propTypes, as a comma-delimited string
 */
function getPropNames(Component) {
  return Object.keys(Component.propTypes || {}).join(', ');
}

/**
 * Deliver scope object, as required by React Live's LiveProvider
 * Always include the name'd component, and add any "EXTRA" components, as specified in DEMO meta
 */
function getScopeForReactLive(name) {
  const baseScope = { [name]: Components[name] };
  return (DEMO[name.toUpperCase()].EXTRA_SCOPE || []).reduce(
    (accum, compName) => ({ ...accum, [compName]: Components[compName] }),
    baseScope
  );
}

/**
 * Deliver an object of props for a given ComponentDemo component
 */
function getDemoComponentProps(name) {
  const key = name.toUpperCase();

  if (!DEMO[key]) return null;

  const Component = Components[name];

  return {
    code: DEMO[key].CODE.trim(),
    name,
    description: DEMO[key].DESCRIPTION,
    propList: getPropNames(Component),
    scope: getScopeForReactLive(name)
  };
}

export default {
  WRAPPERS: ['Block', 'Wrap', 'Section'].map(name => getDemoComponentProps(name)),
  TYPOGRAPHY: ['Heading', 'Text'].map(name => getDemoComponentProps(name)),
  GRID: ['Flex', 'FlexItem'].map(name => getDemoComponentProps(name)),
  MISC: ['Display', 'Rule'].map(name => getDemoComponentProps(name))
};
