import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, cssSpacing, toCssUnits, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * A "smarter" <hr/>
 * Renders <div>
 */
const propTypes = {
  borderStyle: PropTypes.string,
  color: PropTypes.string,
  colorTo: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ...mediaStylesPropTypes,
};

const defaultProps = {
  borderStyle: 'solid',
  color: '#000',
  height: 1,
};

const getCss = props => {
  const { borderStyle, color, height, margin } = props;

  const borderCss = borderStyle !== 'solid' ? `${toCssUnits(height)} ${borderStyle} ${color}` : '';

  if (borderCss) {
    // prettier-ignore
    return css`
      border-top: ${borderCss};
      ${margin && cssSpacing('margin', props)} 
      ${withMediaStyles(props)};
    `
  }

  const colorTo = props.colorTo || color;
  const background = `linear-gradient(to right, ${color}, ${colorTo})`;
  // prettier-ignore
  return css`
    background: ${background};
    height: ${toCssUnits(height)}; 
    ${margin && cssSpacing('margin', props)}
    ${withMediaStyles(props)};
  `
};

const Rule = styled.div`
  ${props => getCss(addTheme(props))};
`;
Rule.propTypes = propTypes;
Rule.defaultProps = defaultProps;
export default Rule;
