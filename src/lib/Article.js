import {
  basePropTypes,
  containerPropTypes,
  justifyPropTypes,
  spacingPropTypes,
  mediaStylesPropTypes
} from './utils';

import Block from './Block';

const propTypes = {
  ...basePropTypes,
  ...containerPropTypes,
  ...justifyPropTypes,
  ...spacingPropTypes,
  ...mediaStylesPropTypes
};

/**
 * Article block wrapper
 * Duplicates Block, renders <section> tag
 */
const Article = Block.withComponent('article');
Article.propTypes = propTypes;
export default Article;
