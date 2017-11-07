import styled, { css } from 'styled-components'
import {
  addTheme,
  basePropTypes,
  justifyPropTypes,
  withJustify,
  spacingPropTypes,
  withSpacing,
  mediaStylesPropTypes,
  withMediaStyles
} from './utils'

/**
 * Block wrapper
 * Renders <div> tag
 */
const propTypes = {
  ...basePropTypes,
  ...justifyPropTypes,
  ...spacingPropTypes,
  ...mediaStylesPropTypes
}

// prettier-ignore
const getCss = props => css`
  ${withJustify(props)}
  ${withSpacing(props)}
  ${withMediaStyles(props)}
`

const Block = styled.div`${props => getCss(addTheme(props))};`
Block.propTypes = propTypes
export default Block
