import {
  basePropTypes,
  containerPropTypes,
  justifyPropTypes,
  spacingPropTypes,
  mediaStylesPropTypes,
} from './utils';

import Block from './Block';

const propTypes = {
  ...basePropTypes,
  ...containerPropTypes,
  ...justifyPropTypes,
  ...spacingPropTypes,
  ...mediaStylesPropTypes,
};

/**
 * Section block wrapper
 * Duplicates Block, renders <section> tag
 */
const Section = Block.withComponent('section');
Section.propTypes = propTypes;
export default Section;
