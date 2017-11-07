import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import {
  addTheme,
  basePropTypes,
  spacingPropTypes,
  withSpacing,
  mediaStylesPropTypes,
  withMediaStyles
} from './utils'

/**
 * Flex "container", to contain FlexItems
 * Renders <div>
 * https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
 *
 * CSS Defaults:
 *   flex-direction: row;
 *   flex-wrap: nowrap;
 *   justify-content: stretch;
 *   align-items: stretch;
 *   align-content: stretch;
 */
const propTypes = {
  inline: PropTypes.bool,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around'
  ]),
  alignItems: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'baseline']),
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around'
  ]),
  ...basePropTypes,
  ...spacingPropTypes,
  ...mediaStylesPropTypes
}

// Change certain defaults for grid-like behavior
const defaultProps = {
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}

// prettier-ignore
const getCss = props => css`
  display: ${props.inline ? 'inline-flex' : 'flex'};
  ${props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${props.flexWrap && `flex-wrap: ${props.flexWrap};`}
  ${props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${props.alignItems && `align-items: ${props.alignItems};`}
  ${props.alignContent && `align-content: ${props.alignContent};`}
  ${withSpacing(props)}
  ${withMediaStyles(props)}
`

const Flex = styled.div`${props => getCss(addTheme(props))};`
Flex.propTypes = propTypes
Flex.defaultProps = defaultProps
export default Flex
